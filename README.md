# indexify

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-908a85?logo=gitpod)](https://gitpod.io/#https://github.com/Michionlion/indexify)

Create indices, graphs, price relations, and more for Prosperous Universe's economy.

## Production deployment

Pushing to `main` runs CI, builds an ARM64/AMD64 image tagged with the exact
commit SHA, publishes it to `ghcr.io/michionlion/indexify`, and deploys it
through the repository-scoped `indexify-production` runner.

The source-free production runtime lives at `/mnt/data/deploy/indexify` on the
server. Its public web container joins the shared external `edge` network and
advertises `indexify.saejinheinert.com` to Traefik; it does not publish a host
port. The active image reference is recorded in `.release.env`, and a failed
health check restores the previously recorded release.
