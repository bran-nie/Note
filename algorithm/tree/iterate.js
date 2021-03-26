// tree 遍历

// DLR 先序遍历
const iterateDLR = (tree) => {
    if (tree === null) return;
    // push
    iterateDLR(tree.leftChild);
    iterateDLR(tree.rightChild);
};

const inorder = (tree) => {
    if (tree === null) return;
    inorder(tree.leftChild);
    // push
    inorder(tree.rightChild);
};

const postOrder = (tree) => {
    if (tree === null) return;
    postOrder(tree.leftChild);
    postOrder(tree.rightChild);
    // push
};
