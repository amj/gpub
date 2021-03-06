(function() {
  module('glift.diagrams.diagramsTest');
  var basicSgf = '(;GB[1]C[foo]AW[aa]AB[ab]LB[ab:z])';
  var diagramType = gpub.diagrams.diagramType;
  var diagramContext = gpub.book.diagramContext;
  var format = gpub.outputFormat;

  test('Create: GOOE', function() {
    var flattened = gpub.diagrams.flatten(basicSgf);
    var d = gpub.diagrams.create(flattened, diagramType.GOOE);
    ok(d.indexOf(gpub.diagrams.gooe.symbolMap.TOP_EDGE) !== -1);
  });

  test('label for collisions', function() {
    var coll = [
      {color: 'BLACK', mvnum: '1', label: 'a', collisionStoneColor: 'BLACK'},
      {color: 'WHITE', mvnum: '10', label: 'x', collisionStoneColor: 'WHITE'}
    ];
    deepEqual(
        gpub.diagrams._constructLabel(coll),
        'Black 1 at Black (a),\nWhite 10 at White (x).');
  });

  test('label for collisions: two stones/label', function() {
    var coll = [
      {color: 'BLACK', mvnum: '1', label: '1'},
      {color: 'WHITE', mvnum: '2', label: '1', collisionStoneColor: 'BLACK'},
      {color: 'WHITE', mvnum: '10', label: 'x'}
    ];
    deepEqual(
        gpub.diagrams._constructLabel(coll),
        'Black 1, White 2 at Black 1,\nWhite 10 at White (x).');
  });

  test('label for collisions: two stones/label + moves', function() {
    var coll = [
      {color: 'BLACK', mvnum: '1', label: 'a', collisionStoneColor: 'BLACK'},
      {color: 'WHITE', mvnum: '2', label: 'a', collisionStoneColor: 'BLACK'},
      {color: 'WHITE', mvnum: '10', label: 'x', collisionStoneColor: 'BLACK'}
    ];
    deepEqual(
        gpub.diagrams._constructLabel(coll, true, 1, 10),
        '(Moves: 1-10)\n' +
        'Black 1, White 2 at Black (a),\nWhite 10 at Black (x).');
  });

  test('label for collisions: compactify', function() {
    var rows = [
      'Black 1, White 2 at Black (a)',
      'White 10 at Black (x)',
      'Black 1, White 2 at Black (a)',
      'White 10 at Black (x)',
      'White 10 at Black (x)',
      'Black 1, White 2, Black 3 at Black (a)'
    ];
    var l = gpub.diagrams._compactifyLabels(rows);
    deepEqual(l.length, 4);
  });

  test('Full Latex Creation', function() {
    var f = gpub.diagrams.flatten(basicSgf);
    var out = gpub.diagrams.create(
        gpub.diagrams.flatten(basicSgf),
        diagramType.GOOE);
    ok(out, 'should be truthy');
  });

  test('Get init: gnos', function() {
    var init = gpub.diagrams.getInit('GNOS', 'LATEX');
    deepEqual(init, gpub.diagrams.gnos.init.LATEX);
  });

  test('Get init: gooe', function() {
    var init = gpub.diagrams.getInit('GOOE', 'LATEX');
    deepEqual(init, gpub.diagrams.gooe.init.LATEX());
  });
})();
