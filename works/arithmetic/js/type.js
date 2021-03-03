export const TOKEN_TYPE = {
    SIGN: {
        type: 'SIGN',
        className: 'sign',
    },
    NUMBER: {
        type: 'NUMBER',
        className: 'number',
    },
    EOF: {
        type: 'EOF',
        className: 'eof',
    },
    LEFT_PAR: {
        type: '(',
        className: 'sign',
    },
    CLOSE_PAR: {
        type: ')',
        className: 'sign',
    },
};

export const NODE_DATA = {
    ROOT: {
        type: 'ROOT',
        name: 'root',
        maxChildren: 0,
        priority: 0,
    },
    NEGATE: {
        type: 'NEGATE',
        name: 'negate',
        maxChildren: 1,
        priority: 6,
    },
    NUMBER: {
        type: 'NUMBER',
        name: 'number',
        maxChildren: 1,
        priority: 8,
    },
    '+': {
        type: '+',
        name: 'add',
        maxChildren: 2,
        priority: 4,
    },
    '-': {
        type: '-',
        name: 'sub',
        maxChildren: 2,
        priority: 4,
    },
    '*': {
        type: '*',
        name: 'mul',
        maxChildren: 2,
        priority: 5,
    },
    '/': {
        type: '/',
        name: 'div',
        maxChildren: 2,
        priority: 5,
    },
    '(': {
        type: '(',
        name: 'left_par',
        maxChildren: 0,
        priority: 1,
    },
    ')': {
        type: ')',
        name: 'close_par',
        maxChildren: 0,
        priority: 10,
    },
};
