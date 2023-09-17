pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                // Replace with your build command if needed
                sh 'npm run build'
            }
        }

        stage('Start Application') {
            steps {
                // Replace with your start command
                sh 'node app.js'
            }
        }
    }

    post {
        success {
            echo 'The pipeline has completed successfully.'
        }
        failure {
            echo 'The pipeline has failed.'
        }
    }
}
