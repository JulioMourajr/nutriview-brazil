import { trace, SpanStatusCode, Span } from '@opentelemetry/api';
import { WebTracerProvider, BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

// Configuration from environment
const OTEL_EXPORTER_ENDPOINT = import.meta.env.VITE_OTEL_EXPORTER_ENDPOINT || 'http://localhost:4318/v1/traces';
const SERVICE_NAME = 'sisvan-dashboard';
const SERVICE_VERSION = '1.0.0';

// Global provider reference
let provider: WebTracerProvider | null = null;

/**
 * Initialize OpenTelemetry tracing for the browser
 */
export function initTelemetry(): void {
  if (provider) {
    console.log('[OTEL] Telemetry already initialized');
    return;
  }

  try {
    // Create resource with service information
    const resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: SERVICE_NAME,
      [ATTR_SERVICE_VERSION]: SERVICE_VERSION,
      'deployment.environment': import.meta.env.MODE || 'development',
    });

    // Create trace exporter (OTLP/HTTP)
    const traceExporter = new OTLPTraceExporter({
      url: OTEL_EXPORTER_ENDPOINT,
      headers: {},
    });

    // Create and configure the tracer provider
    provider = new WebTracerProvider({
      resource,
      spanProcessors: [new BatchSpanProcessor(traceExporter)],
    });

    // Use Zone context manager for async context propagation
    provider.register({
      contextManager: new ZoneContextManager(),
    });

    // Register fetch instrumentation for automatic API tracing
    registerInstrumentations({
      instrumentations: [
        new FetchInstrumentation({
          propagateTraceHeaderCorsUrls: [
            /https:\/\/apidadosabertos\.saude\.gov\.br/,
            /localhost/,
            /127\.0\.0\.1/,
          ],
          clearTimingResources: true,
          applyCustomAttributesOnSpan: (span, request, response) => {
            if (request instanceof Request) {
              span.setAttribute('http.request.url', request.url);
              span.setAttribute('http.request.method', request.method);
            }
            if (response) {
              span.setAttribute('http.response.status_code', response.status);
            }
          },
        }),
      ],
    });

    console.log('[OTEL] Telemetry initialized successfully', {
      service: SERVICE_NAME,
      version: SERVICE_VERSION,
      endpoint: OTEL_EXPORTER_ENDPOINT,
    });
  } catch (error) {
    console.error('[OTEL] Failed to initialize telemetry:', error);
  }
}

/**
 * Get the current tracer instance
 */
export function getTracer(name: string = SERVICE_NAME) {
  return trace.getTracer(name, SERVICE_VERSION);
}

/**
 * Get current trace context information for log correlation
 */
export function getTraceContext(): { traceId: string; spanId: string } | null {
  const activeSpan = trace.getActiveSpan();
  if (!activeSpan) {
    return null;
  }

  const spanContext = activeSpan.spanContext();
  return {
    traceId: spanContext.traceId,
    spanId: spanContext.spanId,
  };
}

/**
 * Enhanced logger that includes trace context in every log
 */
export const logger = {
  _formatMessage(level: string, message: string, data?: Record<string, unknown>) {
    const traceContext = getTraceContext();
    const timestamp = new Date().toISOString();
    
    const logEntry = {
      timestamp,
      level,
      message,
      service: SERVICE_NAME,
      ...(traceContext && {
        trace_id: traceContext.traceId,
        span_id: traceContext.spanId,
      }),
      ...(data && { data }),
    };

    return JSON.stringify(logEntry);
  },

  info(message: string, data?: Record<string, unknown>) {
    console.log(this._formatMessage('info', message, data));
  },

  warn(message: string, data?: Record<string, unknown>) {
    console.warn(this._formatMessage('warn', message, data));
  },

  error(message: string, data?: Record<string, unknown>) {
    console.error(this._formatMessage('error', message, data));
  },

  debug(message: string, data?: Record<string, unknown>) {
    if (import.meta.env.DEV) {
      console.debug(this._formatMessage('debug', message, data));
    }
  },
};

/**
 * Create a custom span for tracking specific operations
 */
export function withSpan<T>(
  name: string,
  fn: (span: Span) => T | Promise<T>,
  attributes?: Record<string, string | number | boolean>
): Promise<T> {
  const tracer = getTracer();
  
  return tracer.startActiveSpan(name, async (span) => {
    try {
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });
      }

      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  });
}

/**
 * Record a custom event/metric
 */
export function recordEvent(name: string, attributes?: Record<string, string | number | boolean>) {
  const activeSpan = trace.getActiveSpan();
  if (activeSpan) {
    activeSpan.addEvent(name, attributes);
  }
}
