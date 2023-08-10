type AbsolutePath = string & { _brand: 'abs' };

function isAbsolutePath(path: string): path is AbsolutePath {
  return path.startsWith('/');
}

function listAbsolutePath(path: AbsolutePath) {
  /** some code */
  console.log(path);
}

function foo(path: string) {
  if (isAbsolutePath(path)) {
    listAbsolutePath(path);
  }

  // listAbsolutePath(path);
}
