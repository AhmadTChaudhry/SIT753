#!/bin/bash
node controller.js &
sleep 5
npm test
wait
