#!/bin/bash
npm start &
sleep 5
npm test
wait
