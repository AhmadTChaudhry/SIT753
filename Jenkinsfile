pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        REPO = 'https://github.com/AhmadTChaudhry/SIT753'
        DOCKER_IMAGE = 'ahmadtc/753'
    }

    stages {
        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    // Run tests
                    sh 'docker run $DOCKER_IMAGE npm test'
                }
            }
        }

        stage('Code Quality') {
            steps {
                script {
                    // Start the server in the background
                    sh 'docker run -d -p 3040:3040 ahmadtc/753 npm start'
                    // Wait for a few seconds to ensure the server is up
                    sleep(5)
                    // Run SonarQube or any other quality tool
                    sh 'sonar-scanner'
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    sh 'docker login -u ahmadtc -p H2Chuhet123'
                    sh 'docker push $DOCKER_IMAGE'
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
