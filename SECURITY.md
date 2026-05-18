# Security Policy

WildScape Europe Release 1.0.0 is a client-side React application with deterministic local services and optional public Mapbox configuration. The repository treats security as part of the quality gate rather than a separate afterthought.[1]

## Supported version

| Version | Supported |
|---|---:|
| 1.0.x | Yes |

## Reporting a vulnerability

Please open a private security advisory in GitHub when available, or contact the repository owner through the GitHub profile connected to the project. Reports should include the affected version, reproduction steps, impact, and any recommended mitigation. Do not disclose an unresolved vulnerability publicly before the maintainer has had a reasonable chance to review and patch it.

## Security expectations

| Area | Standard |
|---|---|
| Secrets | Private secrets must not be committed. Public frontend variables must use the `VITE_` prefix only when they are safe to expose. |
| Dependencies | Dependency changes should be intentional, reviewed, and validated through `npm run hygiene`. |
| Browser APIs | New browser API usage should be guarded or polyfilled in tests when needed. |
| User data | Release 1.0.0 uses deterministic local data and should not persist sensitive personal information. |
| External services | New network integrations should be isolated behind service facades and documented in `docs/API.md`. |

## Maintainer response

The maintainer should acknowledge valid reports, reproduce the issue, create a minimal fix, run the full hygiene gate, document the fix in `CHANGELOG.md`, and release from `main`.

## References

[1]: https://docs.github.com/en/code-security "GitHub Code Security Documentation"
