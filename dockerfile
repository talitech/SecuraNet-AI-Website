# Use official Nginx base image
FROM nginx:alpine

# Copy static website files to Nginx default directory
COPY ./ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Use default Nginx command
CMD ["nginx", "-g", "daemon off;"]
