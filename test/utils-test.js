var tape = require('tape'),
  utils = require('../build/utils');

tape('linearDependent', function(test) {
  test.test('linearDependent of zeroes', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 0, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.end();
  });

  test.test('linearDependent with y=0 and z=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 0, z: 0 },
      v2 = { x: 2, y: 0, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.ok(utils.linearDependent(v1, v2));
    test.end();
  });

  test.test('linearDependent with x=0 and z=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 1, z: 0 },
      v2 = { x: 0, y: 2, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.ok(utils.linearDependent(v1, v2));
    test.end();
  });

  test.test('linearDependent with x=0 and y=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 0, z: 1 },
      v2 = { x: 0, y: 0, z: 2 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.ok(utils.linearDependent(v1, v2));
    test.end();
  });

  test.test('linearDependent with z=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 2, z: 0 },
      v2 = { x: 2, y: 1, z: 0 },
      v3 = { x: 2, y: 4, z: 0 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });

  test.test('linearDependent with y=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 0, z: 2 },
      v2 = { x: 2, y: 0, z: 1 },
      v3 = { x: 2, y: 0, z: 4 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });

  test.test('linearDependent with x=0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 0, y: 1, z: 2 },
      v2 = { x: 0, y: 2, z: 1 },
      v3 = { x: 0, y: 2, z: 4 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });

  test.test('linearDependent without 0', function(test) {
    var v0 = { x: 0, y: 0, z: 0 },
      v1 = { x: 1, y: 2, z: 3 },
      v2 = { x: 2, y: 1, z: 3 },
      v3 = { x: 2, y: 4, z: 6 };
    test.ok(utils.linearDependent(v0, v1));
    test.ok(utils.linearDependent(v1, v0));
    test.notOk(utils.linearDependent(v1, v2));
    test.ok(utils.linearDependent(v1, v3));
    test.end();
  });
});

tape('isConvexPolygon', function(test) {
  triangle = [[1, 1], [0, 0], [2, 0]];
  square = [[0, 0], [1, 0], [1, 1], [0, 1]];
  reversedSquare = square.slice().reverse();
  selfIntersect = [[0, 0], [0, 1], [1, 0], [1, 1]];

  test.equal(utils.polygonDirection(triangle), 1);
  test.equal(utils.polygonDirection(square), 1);
  test.equal(utils.polygonDirection(reversedSquare), -1);
  test.equal(utils.polygonDirection(selfIntersect), undefined);
  test.end();
});
