## Deployment

**Live Application:** https://YOUR-ACTUAL-SERVICE.onrender.com

### Health Check
`https://YOUR-ACTUAL-SERVICE.onrender.com/health`

Expected response:
`{"status":"ok"}`

### Monitoring
- Prometheus configuration: `monitoring/prometheus.yml`
- Grafana dashboard: `monitoring/dashboard.json`
- Deployment evidence: `docs/`

### Container Image
`ghcr.io/skit-devops-2026/devops-24eskcs067:latest`

### Deployment Evidence
See the screenshots in the `docs/` directory.

