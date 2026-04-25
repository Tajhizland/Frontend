module.exports = {
  apps: [
    {
      name: "front",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
