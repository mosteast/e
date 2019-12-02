export interface T_error {
  /**
   * Unique error code for error identifying, can be overwritten by by descendents.
   *
   * @example 'E1829'
   */
  eid?: string

  /**
   * String version of error chain from inheritance.
   * @example 'e_base.external.invalid_api_argument'
   */
  echain?: string

  /**
   * Error chain from inheritance.
   * @example [ 'e', 'external', 'invalid_api_argument' ]
   */
  chain?: string[]

  /**
   * Error level, defined and specified by descendents.
   *
   * @example 'internal'
   * @example 'external'
   * @example 'database'
   */
  level?: string

  /**
   * How to solve this problem
   *
   * @example 'Please configure .env file first.'
   */
  solution?: string

  /**
   * One line to cover the error.
   */
  message?: string

  /**
   * Additional data of the error goes here
   *
   * @example {input: {username: 'Not a username'}}
   */
  data?: any

  /**
   * Stack info
   */
  stack?: string
}

export class E implements T_error {
  /**
   * Unique error code for error identifying, can be overwritten by by descendents.
   *
   * @example 'E1829'
   */
  eid: string

  /**
   * String version of error chain from inheritance.
   * @example 'e_base.external.invalid_api_argument'
   */
  echain: string

  /**
   * Error chain from inheritance.
   * @example [ 'e', 'external', 'invalid_api_argument' ]
   */
  chain: string[] = []

  /**
   * Error level, defined and specified by descendents.
   *
   * @example 'internal'
   * @example 'external'
   * @example 'database'
   */
  level: string

  /**
   * How to solve this problem
   *
   * @example 'Please configure .env file first.'
   */
  solution?: string

  /**
   * One line to cover the error.
   */
  message: string

  /**
   * Additional data of the error goes here
   *
   * @example {input: {username: 'Not a username'}}
   */
  data?: any

  /**
   * Stack info
   */
  stack: string

  constructor(message?: string)
  constructor(message?: string, solution?: string)
  constructor(e?: Error)
  constructor(e?: E)
  constructor(opt?: T_error)
  constructor(...argS) {
    this.init(...argS)
  }

  init(...a) {
    const a0 = a[0]
    switch (a.length) {
      case 1:
        switch (typeof a0) {
          case 'string':
            this.message = a0
            break
          case 'object':
            this.fill(a0)
            break
        }
        break
      case 2:
        let a1 = a[1]
        this.message = a0

        switch (typeof a1) {
          case 'string':
            this.solution = a1
            break
          case 'object':
            this.fill(a1)
            break
        }
        break
    }

    this.stack = (new Error()).stack
    this.generate_chain()
    this.generate_echain()
  }

  /**
   * Generate error chain based on inheritance
   * @param ins
   * @param echain
   */
  generate_chain(ins = undefined) {
    if (ins === undefined) {
      ins = this
    }

    ins = Object.getPrototypeOf(ins)
    const name = ins.constructor.name.toLowerCase()

    this.chain.unshift(name)

    if (ins.constructor === E || !ins.constructor) {return}

    return this.generate_chain(ins)
  }

  /**
   * Generate and get echain string
   * @returns {string}
   */
  generate_echain() {
    if (!this.echain) {
      this.echain = this.chain.join('.')
    }
    return this.echain
  }

  /**
   * Fill `this` with a another object
   * @param obj
   */
  fill(obj) {
    for (let key in obj) {
      this[key] = obj[key]
    }
  }
}
