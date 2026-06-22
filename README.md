## Birthday Tracker

- website can be visited at https://hagensr.github.io/BirthdayTracker/
- Made for Hailey and Patty 
- website can be built with `ng build --output-path docs --base-href /BirthdayTracker/ --configuration production`

## Deployment (hagensr.com/birthday_tracker)

Build with the correct base href:

```bash
ng build --base-href /birthday_tracker/
```

Remove the old files on the server:

```bash
rm -rf /path/on/server/birthday_tracker/browser/
```

Copy the new build to the server:

```bash
scp -r dist/browser antarctic9115@140.186.100.129:/home/antarctic9115/birthday_tracker/
```

Fix permissions if needed:

```bash
sudo chmod -R 755 .
```

The Caddyfile is at the project root. Update the `root *` path to the absolute path on the server before use.

### TODO
- add tests


## FIXED
- fix sorting on home page for within a month
- add export / import functionality