pipeline {
    agent any

    environment {
        DOCKER_REGISTRY_CREDENTIALS = credentials('docker-hub-credentials')
        REPO = 'https://github.com/AhmadTChaudhry/SIT753'
        DOCKER_IMAGE = 'ahmadtc/753'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install npm packages
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the Docker image
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }

        stage('Run Server and Tests') {
            parallel {
                stage('Server') {
                    steps {
                        script {
                            // Start the server
                            sh 'npm start &'
                            sleep 5 // Wait for the server to start
                        }
                    }
                }
                stage('Test') {
                    steps {
                        script {
                            sleep 5 // Wait for the server to be ready
                            sh 'npm test' // Run your tests
                        }
                    }
                }
            }
        }

        stage('Release to Production') {
            steps {
                script {
                    // Run the Docker container
                    sh 'docker run -d -p 80:3040 $DOCKER_IMAGE'
                }
            }
        }

        stage('Deploy to Test Environment') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    sh 'docker login -u ahmadtc -p H2Chuhet123' // Consider using credentials instead of hardcoding
                    sh 'docker push $DOCKER_IMAGE'
                }
            }
        }
    }
}
