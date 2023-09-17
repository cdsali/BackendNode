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
                sh 'yarn install'
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'  // Replace with your build command if needed
            }
        }

        stage('Start Application') {
            steps {
                sh 'node app.js'  // Replace with your start command
            }
        }
    }
}
