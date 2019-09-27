FROM ruby:2.5

RUN useradd -u 8877 non-root-user
USER non-root-user

RUN bundle config --global silence_root_warning 1
RUN gem install cocoapods

COPY . .
ENV LANG en_US.UTF-8
ENTRYPOINT sh main.sh
