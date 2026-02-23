pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/JulioMourajr/nutriview-brazil.git'
            }
        }
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test' // ou 'npm run test' se for o comando correto
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
        }
    }
}