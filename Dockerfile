FROM node:19
WORKDIR /app
RUN apt-get update -y && apt-get install -y git
COPY package.json .
RUN npm install
COPY . .
RUN npm cache clean --force # OKD Shit
RUN rm -rf /.npm
RUN git config --system --add safe.directory '*' # This is also some OKD shit.
CMD ["npm", "start"]

