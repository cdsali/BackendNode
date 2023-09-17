pipeline {
    agent any

      environment {
        NODEJS_HOME = tool name: 'Yarn', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    }

    stages {
          stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh "${NODEJS_HOME}/bin/yarn install"
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
