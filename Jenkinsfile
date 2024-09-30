pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = 'ahmadtc/753'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker images
                    sh 'docker-compose build'
                }
            }
        }

        // stage('Test') {
        //     steps {
        //         script {
        //             // Run the tests using Docker Compose
        //             sh 'docker-compose up --abort-on-container-exit --exit-code-from test'
        //         }
        //     }
        // }

        // stage('Code Quality') {
        //     steps {
        //         script {
        //             // Run SonarQube or any other quality tool
        //             sh 'sonar-scanner'
        //         }
        //     }
        // }

        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    sh 'docker login -u ahmadtc -p H2Chuhet123'
                    sh 'docker-compose push app'
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    // Deploy to production (replace with your specific deployment command)
                    sh 'docker run -d -p 80:3040 $DOCKER_IMAGE'
                }
            }
        }
    }
}
