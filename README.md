# unsub

## plan

- control panel
  - puppeteer
  - db connect/transact/load/erase
- list multiselect for message processing
- retry
- pointer for stropping
- error log
- proper auth
  - jwt
  - oauth?
  - oidc?

```bash
curl -X POST "https://api.mapbox.com/tilesets/v1/sources/shortpoet/hello-world?access_token=\" \
    -F file=@${PWD}/tileset-source-test.geojson \
    --header "Content-Type: multipart/form-data"

curl -X POST "https://api.mapbox.com/tilesets/v1//shortpoet.recipe-test?access_token=$TOKEN" \
  -d "$d" \
  --header "Content-Type:application/json"
```
