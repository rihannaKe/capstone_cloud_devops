# Step 1:
# Build image and add a descriptive tag
docker build --tag=58910810/capstone-project .

# Step 2: 
# List docker images
docker image ls

# Step 3: 
# Run create-next-app
docker run -p 5000:80 58910810/capstone-project