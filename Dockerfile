FROM ruby:2.5
ENV LANG en_US.UTF-8
RUN useradd -u 8877 non-root-user
USER non-root-user

RUN gem install cocoapods

COPY . .

ENTRYPOINT sh main.sh
