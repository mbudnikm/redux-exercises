import produce from "immer"

const { getTodos } = require('../data')
const todos = getTodos()

describe('Immutability', () => {

  describe('Utilities', () => {

		const john = {
			firstname: "John",
			lastname: "Lennon"
		}
	
		const paul = {
			firstname: "Paul",
			lastname: "McCartney"
		}
	
		const musician = {
			profession: "musician",
			salary: 5000
		}
	
		it('merge two objects', () => {
			// define `merge2objects` function here
			// for 2 given parameters, the function returns an new merged object 
			const merge2objects = (obj1, obj2) => {
				// return Object.assign({}, obj1, obj2)
				return ({
					...obj1,
					...obj2
				})
			}
	
			expect(merge2objects(john, musician)).toEqual({
				firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
			})
	
			expect(merge2objects(paul, musician)).toEqual({
				firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
			})
		})
	
		it('merging multiple objects', () => {
			// define `mergeManyObjects` function here
			// same as above, but accepts multiple objects as input parameters 
			const mergeManyObjects = (...args) => {
				return Object.assign({}, ...args)
			}

			// soultion (2)
			/*const mergeManyObjects = (...objects) => {
				let result = {}
				for(let obj of objects) {

				}
			}*/
	
			expect(mergeManyObjects({ id: 8492745921 }, john, musician)).toEqual({
				id: 8492745921, firstname: "John", lastname: "Lennon", profession: "musician", salary: 5000
			})
	
			expect(mergeManyObjects({ id: 5193421984 }, paul, musician)).toEqual({
				id: 5193421984, firstname: "Paul", lastname: "McCartney", profession: "musician", salary: 5000
			})
		})
	
		it('strip static attribute from objects', () => {
			// define `stripId` function here
			// it will return an immutable version of input object with `id` removed
			const stripId = (obj) => {
				const clone = Object.assign({}, ...obj)
				delete clone.id
				return clone
			} 
			//var stripId = ({id, ...obj}) => ({...obj})
	
			// all following expectations check the same - `id` attr should have been removed
			expect(stripId({
				id: 8492745921, firstname: "John", lastname: "Lennon"
			})).toEqual({
				firstname: "John", lastname: "Lennon"
			})
	
			expect(stripId(shoppingData[0])).toEqual({
				type: 'Clothes', name: 'Socks', price: 1.00, qty: 5
			})
	
			expect(todos.slice(0, 5).map(stripId)).toEqual([{
				"title": "Networked methodical function Shoes",
				"marked": true
			}, {
				"title": "Progressive client-server moratorium Car",
				"marked": true
			}, {
				"title": "Re-engineered logistical leverage Towels",
				"marked": false
			}, {
				"title": "Multi-channelled discrete budgetary management Bike",
				"marked": false
			}, {
				"title": "Seamless homogeneous functionalities Car",
				"marked": false
			}])
		})
	
		it('strip dynamic attribute from objects', () => {
			// define `stripKey` function here
			// same as above, but accepts the key as the 1st param (it's not hardcoded)
			// and the object itself as the 2nd param
	
			// OPTION 1: EASY, remove the attr, as long as the original one isn't affected
	
			// OPTION 2: use ES6 destructuring (a little tricky one)
			// hint: replace static attribute with a computed property ( attr ---> [attrExpr])
	
			expect(stripKey('firstname', {
				id: 8492745921, firstname: "John", lastname: "Lennon"
			})).toEqual({
				id: 8492745921, lastname: "Lennon"
			})
	
			expect(stripKey('qty',
				stripKey('price', shoppingData[0]))).toEqual({
					type: 'Clothes', name: 'Socks', id: 421801449988
				})
		})
  })
})

describe('Immutable operations usecases: State Objects', () => {

	it('change nested attribute', () => {
		const state = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = 'home'
		const newFilter = 'COMPLETED'
		const newState = {
			...state,
			[section]: {
				...state[section],
				filter: newFilter
			}
		} // calculate newState

		// using immer library
		/* const newState = produce(state, draft => {
			draft[section].filter = newFilter
		})*/

		// value checks
		expect(newState.home.filter).toEqual('COMPLETED')
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.work).toBe(newState.work)
	})

	it('append at the end of a nested array collection', () => {
		const state = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = 'home'
		const newItem = {
			id: "4e30f8290ab3-ea75-44f7-78c9-fab461b55d03",
			title: 'buy some beer',
			marked: false
		}

		const newState = {
			...state,
			[section]: {
				...state[section],
				todos: [...state[section].todos, newItem]
			}
		} // calculate newState

		// immer
		/* const newState = produce(state, draft => {
			draft[section].todos.push(newItem)
		}) */

		// value checks
		expect(state.home.todos.length + 1).toEqual(newState.home.todos.length)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.work).toBe(newState.work)
	})

	it('toggle marked attr for a todo within an array collection', () => {
		const state = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = "home"
		const todoId = "ac518c53-d65f-422d-8dc2-550ea6719870"

		// solution (1) imperative
		/* const todosClone = [...state[section].todos]
		todosClone[idx] = {
			...todosClone[idx],
			marked: !todosClone[idx].marked
		}
		const newState = {
			...state,
			[section]: {
				...state[section],
				todos: todosClone
			}
		} */// calculate newState

		// solution (2) declarative
		const newState = {
			...state,
			[section]: {
				...state[section],
				todos: state[section].todos.map(t => 
					t.id === todoId ?
					{...t, marked: !t.marked}:
					t)
			}
		}

		// immer 
		/* const newState = produce(state, draft => {
			const todo = draft[section].todos.find(t => t.id === todoId)
			todo.marked = !todo.marked
		}) */

		const idx = state.home.todos.findIndex(t => t.id === todoId)
		// value checks
		expect(state.home.todos.length).toEqual(newState.home.todos.length)
		expect(state.home.todos[idx].marked).not.toBe(newState.home.todos[idx].marked)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.home.todos[idx]).not.toBe(newState.home.todos[idx])
		expect(state.work).toBe(newState.work)
	})

	it('clear all marked todos within an array collection', () => {
		const state = {
			home: {
				todos: todos,
				filter: "ALL"
			},
			work: {
				todos: [],
				filter: "ALL"
			}
		}

		const section = "home"

		const newState = {
			...state,
			[section]: {
				...state[section],
				todos: state[section].todos.filter(t => !t.marked)
			}
		} // calculate newState

		// immer
		/*  const newState = produce(state, draft => {
			draft[section].todos = draft[section].todos.filter(t => !t.marked)
		}) */

		// value checks
		expect(state.home.todos.length).toEqual(30)
		expect(newState.home.todos.length).toEqual(12)
		// reference checks
		expect(state).not.toBe(newState)
		expect(state.home).not.toBe(newState.home)
		expect(state.home.todos).not.toBe(newState.home.todos)
		expect(state.work).toBe(newState.work)
	})
})
