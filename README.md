# Bigfoot Projects

Bigfoot Projects is an online graphics request submission, tracking and notification system to replace Bigfoot Marketing's old paper workflow. Projects stay in a database and can't get lost, while requesters can check their project's page at any time to see where we are on things.

## Database Relations

`users` submit and own `projects` which have `progress_states` and `attachments` and consist of one or more `deliverables` which have traits defined by `formats`.

`groups` are made up of `memberships`, which make up a record of which `users` are part of which `groups`. `groups` dictate what actions a user can perform.

## Contributing

This project is being developed on Linux and MacOS and deployed to Heroku. You may need to research how to configure some things if you're on Windows.
