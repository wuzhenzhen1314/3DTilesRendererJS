class LinkedListNode {

	constructor() {

		this.previous = null;
		this.next = null;
		this.item = null;

	}

}

export class LinkedList {

	constructor() {

		this.head = null;
		this.tail = null;
		this.itemToNode = new Map();

	}

	push( item ) {

		const tail = this.tail;
		const tailItem = tail ? tail.item : null;
		this.insertAfter( item, tailItem );

	}

	pop() {

		const tail = this.tail;
		if ( tail ) {

			const item = tail.item;
			this.remove( item );
			return item;

		} else {

			return null;

		}

	}

	unshift( item ) {

		this.insertAfter( item, null );

	}

	shift() {

		const head = this.head;
		if ( head ) {

			const item = head.item;
			this.remove( item );
			return item;

		} else {

			return null;

		}

	}

	remove( item ) {

		const itemToNode = this.itemToNode;
		if ( ! itemToNode.has( item ) ) {

			throw new Error();

		}

		const node = itemToNode.get( item );
		if ( this.head === node ) {

			this.head = node.next;

		}

		if ( this.tail === node ) {

			this.tail = node.previous;

		}

		const previous = node.previous;
		const next = node.next;

		if ( previous ) {

			previous.next = next;

		}

		if ( next ) {

			next.previous = previous;

		}

		itemToNode.delete( item );
		node.next = null;
		node.previous = null;
		node.item = null;

	}

	insertAfter( item, beforeItem ) {

		const itemToNode = this.itemToNode;
		if ( itemToNode.has( item ) ) {

			throw new Error();

		}

		const node = new LinkedListNode();
		node.item = item;
		itemToNode.set( item, node );

		if ( ! beforeItem ) {

			const after = this.head;
			if ( after ) {

				after.previous = node;

			}

			node.next = after;
			this.head = node;

			if ( ! this.tail ) {

				this.tail = node;

			}

		} else {

			if ( ! itemToNode.has( beforeItem ) ) {

				throw new Error();

			}
			const before = beforeItem ? itemToNode.get( beforeItem ) : null;
			const after = before.next;
			node.next = after;
			node.previous = before;
			before.next = node;

			if ( after ) {

				after.previous = node;

			}

			if ( this.tail === before ) {

				this.tail = node;

			}

		}

	}

}
