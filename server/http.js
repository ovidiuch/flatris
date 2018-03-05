// @flow

export function startServer(server: net$Server, port: number) {
  // https://github.com/facebook/flow/issues/1684#issuecomment-222627634
  server.listen(port, undefined, undefined, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
}
