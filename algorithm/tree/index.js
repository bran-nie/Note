class TreeNode {
    constructor(data) {
        this.data = data || null;
        this.leftChild = null;
        this.rightChild = null;
    }
}

class Tree {
    constructor(rootData) {
        this.rootData = rootData;
        this.root = new TreeNode(rootData);
    }

    init() {
        this.root = new TreeNode(this.rootData);
    }

    setFullTree(depth) {
        const foo = (tree, _depth) => {
            if (_depth > depth) return;

            tree.leftChild = new TreeNode(_depth);
            tree.rightChild = new TreeNode(_depth);
            foo(tree.leftChild, _depth + 1);
            foo(tree.rightChild, _depth + 1);
        };

        foo(this.root, 2);
    }

    // 先序遍历
    preorder() {
        const result = [];
        const preorderFn = (tree) => {
            if (tree === null) return;
            // push
            result.push(tree.data);
            preorderFn(tree.leftChild);
            preorderFn(tree.rightChild);
        };
        preorderFn(this.root);
        console.log(result);
    }
    // 中序遍历
    inorder() {
        const result = [];
        const inorderFn = (tree) => {
            if (tree === null) return;
            inorderFn(tree.leftChild);
            // push
            result.push(tree.data);
            inorderFn(tree.rightChild);
        };
        inorderFn(this.root);
        console.log(result);
    }
    // 后序遍历
    postorder() {
        const result = [];
        const postorderFn = (tree) => {
            if (tree === null) return;
            postorderFn(tree.leftChild);
            postorderFn(tree.rightChild);
            // push
            result.push(tree.data);
        };

        postorderFn(this.root);
        console.log(result);
    }
    // 层序遍历
    levelorder() {
        const queue = [];
        const result = [];
        if (this.root !== null) {
            queue.push(this.root);
            while (queue.length !== 0) {
                let node = queue.shift();
                result.push(node.data);
                node.leftChild && queue.push(node.leftChild);
                node.rightChild && queue.push(node.rightChild);
            }
        }

        console.log(result);
    }

    // 先序遍历 非递归 采用栈的方式
    preorderStack() {
        const result = [];
        const stack = [];
        let p = null;
        if (this.root !== null) {
            p = this.root;
            while (p !== null || stack.length > 0) {
                if (p !== null) {
                    stack.push(p);
                    result.push(p.data);
                    p = p.leftChild;
                } else {
                    p = stack.pop();
                    p = p.rightChild;
                }
            }
        }

        console.log(result);
    }

    // 获取树的高度
    height() {
        const getTreeHeight = (tree) => {
            let l = 0,
                r = 0;
            if (tree === null) return 0;
            l = getTreeHeight(tree.leftChild);
            r = getTreeHeight(tree.rightChild);

            return 1 + (l > r ? l : r);
        };

        return getTreeHeight(this.root);
    }

    createTree(preArr, inArr) {
        const create = (preArr, inArr, i, j, m, n) => {
            if (n < 0) return null;
            // 创建根节点
            const tree = new TreeNode(preArr[i]);
            let k = m;
            // 在中序列中找到根节点
            while (k <= n && preArr[i] !== inArr[k]) {
                k++;
            }
            // 如果 i 大于 中序列长度
            if (k > n) return null;
            tree.leftChild = create(preArr, inArr, i + 1, i + k - m, m, k - 1);
            tree.rightChild = create(preArr, inArr, i + k - m + 1, j, k + 1, n);

            return tree;
        };

        this.root = create(preArr, inArr, 0, preArr.length - 1, 0, inArr.length - 1);
    }
}
let tree = new Tree();
// let tree = new Tree('A');
// tree.setFullTree(3);

// tree.root.leftChild = new TreeNode('B');
// tree.root.leftChild.leftChild = new TreeNode('D');
// tree.root.leftChild.rightChild = new TreeNode('E');
// tree.root.leftChild.rightChild.leftChild = new TreeNode('G');

// tree.root.rightChild = new TreeNode('C');
// tree.root.rightChild.rightChild = new TreeNode('F');

// tree.preorder();
// tree.inorder();
// tree.postorder();
// tree.levelorder();
// tree.height();
tree.createTree(['A', 'B', 'D', 'E', 'G', 'C', 'F'], ['D', 'B', 'G', 'E', 'A', 'C', 'F']);
