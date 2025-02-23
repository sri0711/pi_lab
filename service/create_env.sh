#!/bin/bash

# Set the environment name
ENV_DIR="pi_lab_env"

# Check if the virtual environment already exists
if [ -d "$ENV_DIR" ]; then
    echo "Virtual environment '$ENV_DIR' already exists. Skipping creation."
else
    echo "Creating virtual environment '$ENV_DIR'..."
    python3 -m venv "$ENV_DIR"
    echo "Virtual environment '$ENV_DIR' created."
fi

source pi_lab_env/bin/activate

pip install -r requirements.txt