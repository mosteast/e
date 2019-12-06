import { E } from '../src/index'

it('Base class should throw', async () => {
  expect(() => {
    throw new E('Yo')
  }).toThrow(E)
})

it('should be able to extend sub error class', async () => {
  class A extends E {}

  const e = new A('Yo')
  expect(() => {throw e}).toThrow(A)
  expect(e.constructor).toBe(A)
})

it('should be able to further extend', async () => {
  const LEVEL = 'level1'

  class A extends E {}

  class B extends A {
    level = LEVEL
  }

  const e = new B('Yo')
  expect(() => {throw e}).toThrow(B)
  expect(e.constructor).toBe(B)
  expect(e).toBeInstanceOf(B)
  expect(e).toBeInstanceOf(A)
  expect(e.level).toBe(LEVEL)
})

it('can overwrite default property', async () => {
  class A extends E {
    message = 'a'

    constructor(...argS) {
      super()
      this.init(...argS)
    }
  }

  const a = new A()

  expect(a.message).toBe('a')

  const b = new A('b')
  expect(b.message).toBe('b')

  const c = new A({ message: 'c', eid: 'E123' })
  expect(c.message).toBe('c')
  expect(c.eid).toBe('E123')
})

it('should be able to convert to JSON', async () => {
  class A extends E {}

  const a = new A({
    message: 'yo',
    level: 'internal',
    eid: 'E01',
  })

  const e = JSON.parse(JSON.stringify(a))

  expect(e).toHaveProperty('eid')
  expect(e).toHaveProperty('level')
  expect(e).toHaveProperty('message')
  expect(e).not.toHaveProperty('XXXXXX')
})

it('can generate echain', async () => {
  class A extends E {}

  class B extends A {}

  const e = new B('yo')
  expect(e.chain).toHaveLength(3)
  expect(e.generate_echain()).toContain('.')
})
