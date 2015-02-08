var fixtures = {
  SquareBlock: {
    'color-of-the-I-tetrimino': {
      color: Flatris.COLORS.I
    },
    'color-of-the-O-tetrimino': {
      color: Flatris.COLORS.O
    },
    'color-of-the-T-tetrimino': {
      color: Flatris.COLORS.T
    },
    'color-of-the-J-tetrimino': {
      color: Flatris.COLORS.J
    },
    'color-of-the-L-tetrimino': {
      color: Flatris.COLORS.L
    },
    'color-of-the-S-tetrimino': {
      color: Flatris.COLORS.S
    },
    'color-of-the-Z-tetrimino': {
      color: Flatris.COLORS.Z
    }
  },

  Tetrimino: {
    'I-tetrimino': {
      color: Flatris.COLORS.I,
      state: {
        grid: Flatris.SHAPES.I
      }
    },
    'O-tetrimino': {
      color: Flatris.COLORS.O,
      state: {
        grid: Flatris.SHAPES.O
      }
    },
    'T-tetrimino': {
      color: Flatris.COLORS.T,
      state: {
        grid: Flatris.SHAPES.T
      }
    },
    'J-tetrimino': {
      color: Flatris.COLORS.J,
      state: {
        grid: Flatris.SHAPES.J
      }
    },
    'L-tetrimino': {
      color: Flatris.COLORS.L,
      state: {
        grid: Flatris.SHAPES.L
      }
    },
    'S-tetrimino': {
      color: Flatris.COLORS.S,
      state: {
        grid: Flatris.SHAPES.S
      }
    },
    'Z-tetrimino': {
      color: Flatris.COLORS.Z,
      state: {
        grid: Flatris.SHAPES.Z
      }
    },
    'rotated-Z-tetrimino': {
      color: Flatris.COLORS.Z,
      state: {
        grid: [
          [0,0,1],
          [0,1,1],
          [0,1,0],
        ]
      }
    },
    'rotated-Z-tetrimino-2': {
      color: Flatris.COLORS.Z,
      state: {
        grid: [
          [0,0,0],
          [1,1,0],
          [0,1,1],
        ]
      }
    },
    'rotated-Z-tetrimino-3': {
      color: Flatris.COLORS.Z,
      state: {
        grid: [
          [0,1,0],
          [1,1,0],
          [1,0,0],
        ]
      }
    }
  },

  WellGrid: {
    '3x3 grid': {
      cols: 3,
      rows: 3,
      state: {
        grid: [
          [null,"5#fbb414","6#fbb414"],
          [null,"4#3993d0","7#fbb414"],
          ["1#3993d0","2#3993d0","3#3993d0"]
        ],
        gridBlockCount: 10
      }
    },
    '10x20 grid': {
      cols: 10,
      rows: 20,
      state: {
        grid: [
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,null,null,null,null,null,null,null],
          [null,null,null,"1168#e84138","1160#3993d0",null,null,"1156#3993d0","1157#3993d0","1158#3993d0"],
          [null,null,"1169#e84138","1170#e84138","1161#3993d0","1140#fbb414","1141#fbb414","1136#e84138","1137#e84138","1159#3993d0"],
          ["1129#b04497","1130#b04497",null,"1086#3993d0","1080#3993d0","1078#95c43d","1079#95c43d","1072#ed652f","1068#fbb414","1069#fbb414"],
          ["1131#b04497","1124#e84138",null,"1087#3993d0","1081#3993d0","1073#ed652f","1074#ed652f","1075#ed652f","1070#fbb414","1071#fbb414"],
          ["1125#e84138","1126#e84138",null,"1082#3993d0","1083#3993d0","1060#b04497","1061#b04497","1062#b04497","1064#ed652f","1065#ed652f"],
          ["1127#e84138","1116#e84138",null,"1048#ed652f","1049#ed652f","1050#ed652f","1063#b04497","1056#95c43d","1057#95c43d","1066#ed652f"],
          ["1117#e84138","1118#e84138",null,"1051#ed652f","1044#95c43d","1045#95c43d","1058#95c43d","1059#95c43d","1036#ed652f","1067#ed652f"],
          ["1119#e84138","1108#e84138",null,"1046#95c43d","1047#95c43d","1032#b04497","1037#ed652f","1038#ed652f","1039#ed652f","1024#3cc7d6"],
          [null,"1053#3cc7d6","1022#ed652f","1023#ed652f","1016#b04497","1004#3993d0","1009#3993d0","1010#3993d0","1011#3993d0","1027#3cc7d6"],
          [null,"1054#3cc7d6","996#b04497","1017#b04497","1018#b04497","1005#3993d0","1006#3993d0","1007#3993d0","988#fbb414","989#fbb414"],
          [null,"1055#3cc7d6","997#b04497","998#b04497","1019#b04497","1000#ed652f","1001#ed652f","968#3993d0","990#fbb414","991#fbb414"]
        ],
        gridBlockCount: 1171
      }
    }
  },

  Well: {
    'paused': {
      state: {
        activeTetrimino: "T",
        activeTetriminoPosition: {
          x: 2,
          y: 13.508750000000028
        },
        animationLoopRunning: false,
        children: {
          activeTetrimino: {
            grid: Flatris.SHAPES.T
          },
          wellGrid: {
            grid: [
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,"1196#b04497",null,null,null,null,null,null,null,null],
              ["1197#b04497","1198#b04497","1199#b04497",null,null,null,null,null,null,null]
            ],
            gridBlockCount: 1199
          }
        }
      }
    },
    'with tetrimino falling': {
      state: {
        activeTetrimino: "S",
        activeTetriminoPosition: {
          x: 4,
          y: 6.834999999999979
        },
        animationLoopRunning: true,
        children: {
          activeTetrimino: {
            grid: Flatris.SHAPES.S
          },
          wellGrid: {
            grid: [
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,"1228#ed652f","1229#ed652f","1230#ed652f",null,null,null,null],
              [null,null,null,"1231#ed652f","1216#fbb414","1217#fbb414",null,"1224#e84138",null,"1212#3cc7d6"],
              ["1220#ed652f","1221#ed652f","1222#ed652f","1200#b04497","1218#fbb414","1219#fbb414","1225#e84138","1226#e84138",null,"1213#3cc7d6"],
              ["1223#ed652f","1196#b04497","1201#b04497","1202#b04497","1204#fbb414","1205#fbb414","1227#e84138","1208#b04497",null,"1214#3cc7d6"]
            ],
            gridBlockCount: 1231
          }
        }
      }
    },
    'with accelerated tetrimino falling': {
      state: {
        activeTetrimino: "I",
        activeTetriminoPosition: {
          x: 1,
          y: 2.3896774193548396
        },
        animationLoopRunning: true,
        dropAcceleration: true,
        children: {
          activeTetrimino: {
            grid: [
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0],
              [0,0,1,0]
            ]
          },
          wellGrid: {
            grid: [
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,null,null,null,null],
              [null,null,null,null,null,null,"1423#fbb414","1424#fbb414",null,null],
              [null,null,null,null,"1415#3993d0","1416#3993d0","1425#fbb414","1426#fbb414","1427#95c43d",null],
              [null,null,null,null,"1417#3993d0","1399#ed652f","1407#fbb414","1408#fbb414","1428#95c43d","1429#95c43d"],
              [null,null,"1411#3cc7d6",null,"1418#3993d0","1400#ed652f","1409#fbb414","1410#fbb414","1403#95c43d","1430#95c43d"],
              [null,"1419#e84138","1412#3cc7d6",null,"1387#3cc7d6","1401#ed652f","1402#ed652f","1395#ed652f","1404#95c43d","1405#95c43d"],
              ["1420#e84138","1421#e84138","1413#3cc7d6",null,"1388#3cc7d6","1396#ed652f","1397#ed652f","1398#ed652f","1371#3cc7d6","1406#95c43d"],
              ["1422#e84138","1391#b04497","1414#3cc7d6",null,"1389#3cc7d6","1383#fbb414","1384#fbb414","1375#3993d0","1372#3cc7d6","1363#3cc7d6"],
              ["1392#b04497","1393#b04497","1379#3993d0",null,"1390#3cc7d6","1385#fbb414","1386#fbb414","1376#3993d0","1373#3cc7d6","1364#3cc7d6"]
            ],
            gridBlockCount: 1430
          }
        }
      }
    }
  },

  FlatrisGame: {
    'new game': {},
    'new game running': {
      state: {
        playing: true,
        paused: false,
        nextTetrimino: 'I',

        children: {
          well: {
            activeTetrimino: 'J',
            activeTetriminoPosition: {x: 4, y: -2},
            animationLoopRunning: true,

            children: {
              activeTetrimino: {
                grid: Flatris.SHAPES.J
              }
            }
          }
        }
      }
    },
    'mission impossible': {
      state: {
        playing: true,
        paused: true,
        nextTetrimino: 'S',
        score: 352,
        lines: 1,

        children: {
          well: {
            activeTetrimino: 'T',
            activeTetriminoPosition: {x: 7, y: 1.4775000000000023},
            animationLoopRunning: false,

            children: {
              activeTetrimino: {
                grid: Flatris.SHAPES.T
              },
              wellGrid: {
                grid: [
                  [null,null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null,null],
                  ["1594#b04497","1595#b04497","1596#b04497","1598#fbb414","1599#fbb414",null,null,null,null,null],
                  [null,"1597#b04497",null,"1600#fbb414","1601#fbb414","1586#ed652f","1590#fbb414","1591#fbb414",null,null],
                  [null,"1570#95c43d","1571#95c43d","1587#ed652f","1588#ed652f","1589#ed652f","1592#fbb414","1593#fbb414","1582#95c43d","1583#95c43d"],
                  ["1572#95c43d","1573#95c43d","1574#3993d0",null,null,"1578#3993d0",null,"1584#95c43d","1585#95c43d",null],
                  ["1566#b04497",null,"1575#3993d0","1576#3993d0","1577#3993d0","1579#3993d0","1580#3993d0","1581#3993d0",null,null],
                  ["1567#b04497","1568#b04497","1558#ed652f","1559#ed652f","1560#ed652f",null,"1562#3cc7d6","1563#3cc7d6","1564#3cc7d6","1565#3cc7d6"],
                  ["1569#b04497",null,"1561#ed652f",null,null,"1550#ed652f","1551#ed652f","1552#ed652f","1554#fbb414","1555#fbb414"],
                  ["1546#b04497","1547#b04497","1548#b04497","1538#3cc7d6","1542#3993d0","1553#ed652f",null,null,"1556#fbb414","1557#fbb414"],
                  [null,"1549#b04497",null,"1539#3cc7d6","1543#3993d0","1544#3993d0","1545#3993d0","1534#95c43d","1535#95c43d","1530#3993d0"],
                  ["1522#ed652f","1523#ed652f","1524#ed652f","1540#3cc7d6","1526#b04497",null,"1536#95c43d","1537#95c43d",null,"1531#3993d0"],
                  [null,"1520#fbb414","1521#fbb414","1541#3cc7d6",null,"1510#3993d0",null,"1516#e84138","1517#e84138",null],
                  [null,null,"1506#b04497","1507#b04497","1508#b04497","1511#3993d0","1512#3993d0","1513#3993d0","1498#95c43d","1499#95c43d"],
                  ["1494#fbb414","1495#fbb414",null,"1509#b04497","1502#95c43d","1503#95c43d",null,"1500#95c43d","1501#95c43d",null],
                  ["1496#fbb414","1497#fbb414","1478#95c43d","1504#95c43d","1505#95c43d","1490#95c43d","1491#95c43d","1486#3993d0",null,null],
                  ["1474#3993d0",null,"1479#95c43d","1480#95c43d","1492#95c43d","1493#95c43d",null,"1487#3993d0","1488#3993d0","1489#3993d0"],
                  ["1475#3993d0","1476#3993d0","1477#3993d0","1481#95c43d","1482#3cc7d6","1483#3cc7d6","1484#3cc7d6","1485#3cc7d6",null,null]
                ],
                gridBlockCount: 1601
              }
            }
          }
        }
      }
    },
    'hallelujah': {
      state: {
        playing: true,
        paused: false,
        nextTetrimino: 'S',
        score: 184,
        lines: 0,

        children: {
          well: {
            activeTetrimino: 'I',
            activeTetriminoPosition: {x: 7, y: 14.716249999999997},
            animationLoopRunning: true,

            children: {
              activeTetrimino: {
                grid: [
                  [0,0,1,0],
                  [0,0,1,0],
                  [0,0,1,0],
                  [0,0,1,0]
                ]
              },
              wellGrid: {
                grid: [
                  [null,null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,null,null,null],
                  [null,null,null,null,null,null,null,"1972#95c43d",null,null],
                  [null,null,null,null,null,null,null,"1973#95c43d","1974#95c43d",null],
                  [null,null,null,null,null,null,null,"1968#b04497","1975#95c43d",null],
                  [null,null,null,null,null,null,"1952#e84138","1969#b04497","1970#b04497",null],
                  [null,null,null,null,null,"1953#e84138","1954#e84138","1971#b04497","1964#e84138",null],
                  [null,null,null,null,null,"1955#e84138","1948#e84138","1965#e84138","1966#e84138",null],
                  [null,null,null,null,null,"1949#e84138","1950#e84138","1967#e84138","1960#b04497",null],
                  [null,null,null,null,null,"1951#e84138","1944#e84138","1961#b04497","1962#b04497",null],
                  [null,null,null,null,null,"1945#e84138","1946#e84138","1956#b04497","1963#b04497",null],
                  [null,"1928#3993d0","1929#3993d0","1976#ed652f",null,"1947#e84138","1957#b04497","1958#b04497","1959#b04497",null],
                  [null,"1930#3993d0","1920#3cc7d6","1977#ed652f",null,"1940#fbb414","1941#fbb414","1936#ed652f","1937#ed652f",null],
                  ["1904#b04497","1931#3993d0","1921#3cc7d6","1978#ed652f","1979#ed652f","1942#fbb414","1943#fbb414","1924#e84138","1938#ed652f",null],
                  ["1905#b04497","1906#b04497","1922#3cc7d6","1916#3993d0","1932#fbb414","1933#fbb414","1925#e84138","1926#e84138","1939#ed652f",null],
                  ["1907#b04497","1892#e84138","1923#3cc7d6","1917#3993d0","1934#fbb414","1935#fbb414","1927#e84138","1912#ed652f","1908#3993d0",null],
                  ["1893#e84138","1894#e84138","1918#3993d0","1919#3993d0","1896#95c43d","1913#ed652f","1914#ed652f","1915#ed652f","1909#3993d0",null],
                  ["1895#e84138","1884#b04497","1888#e84138","1889#e84138","1897#95c43d","1898#95c43d","1900#3993d0","1910#3993d0","1911#3993d0",null],
                  ["1885#b04497","1886#b04497","1887#b04497","1890#e84138","1891#e84138","1899#95c43d","1901#3993d0","1902#3993d0","1903#3993d0",null]
                ],
                gridBlockCount: 1979
              }
            }
          }
        }
      }
    }
  }
};
