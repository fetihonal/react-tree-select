// Searches items tree for object with specified prop with value
//
// @param {object} tree nodes tree with children items in nodesProp[] table, with one (object) or many (array of objects) roots
// @param {string} propNodes name of prop that holds child nodes array
// @param {string} prop name of searched node's prop
// @param {mixed} value value of searched node's  prop
// @returns {object/null} returns first object that match supplied arguments (prop: value) or null if no matching object was found

const searchTree = (tree, nodesProp, prop, value) => {
    let i;
    let f = null; // iterator, found node
    if (Array.isArray(tree)) {
        // if entry object is array objects, check each object
        for (i = 0; i < tree.length; i += 1) {
            f = searchTree(tree[i], nodesProp, prop, value);
            if (f) {
                // if found matching object, return it.
                return f;
            }
        }
    } else if (typeof tree === 'object') {
        // standard tree node (one root)
        if (typeof tree[prop] === 'object') {
            if (tree[prop].en !== undefined && tree[prop].en === value) {
                return tree; // found matching node
            }
        } else if (tree[prop] !== undefined && tree[prop] === value) {
            return tree; // found matching node
        }
    }
    if (tree[nodesProp] !== undefined && tree[nodesProp].length > 0) {
        // if this is not maching node, search nodes, children (if prop exist and it is not empty)
        return searchTree(tree[nodesProp], nodesProp, prop, value);
    }
    return null; // node does not match and it neither have children
};

export default searchTree;
