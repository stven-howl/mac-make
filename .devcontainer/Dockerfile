FROM node:22-bookworm

RUN apt-get update && apt-get install -y less man-db sudo

ARG USERNAME=node

RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

ENV DEVCONTAINER=true
