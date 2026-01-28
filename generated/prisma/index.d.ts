
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserGoal
 * 
 */
export type UserGoal = $Result.DefaultSelection<Prisma.$UserGoalPayload>
/**
 * Model LearningSessionChat
 * 
 */
export type LearningSessionChat = $Result.DefaultSelection<Prisma.$LearningSessionChatPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model LearningJourney
 * 
 */
export type LearningJourney = $Result.DefaultSelection<Prisma.$LearningJourneyPayload>
/**
 * Model LearningSessionOutline
 * 
 */
export type LearningSessionOutline = $Result.DefaultSelection<Prisma.$LearningSessionOutlinePayload>
/**
 * Model LearningJourneyStep
 * 
 */
export type LearningJourneyStep = $Result.DefaultSelection<Prisma.$LearningJourneyStepPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const GoalStatus: {
  active: 'active',
  achieved: 'achieved'
};

export type GoalStatus = (typeof GoalStatus)[keyof typeof GoalStatus]

}

export type GoalStatus = $Enums.GoalStatus

export const GoalStatus: typeof $Enums.GoalStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userGoal`: Exposes CRUD operations for the **UserGoal** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserGoals
    * const userGoals = await prisma.userGoal.findMany()
    * ```
    */
  get userGoal(): Prisma.UserGoalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningSessionChat`: Exposes CRUD operations for the **LearningSessionChat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningSessionChats
    * const learningSessionChats = await prisma.learningSessionChat.findMany()
    * ```
    */
  get learningSessionChat(): Prisma.LearningSessionChatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningJourney`: Exposes CRUD operations for the **LearningJourney** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningJourneys
    * const learningJourneys = await prisma.learningJourney.findMany()
    * ```
    */
  get learningJourney(): Prisma.LearningJourneyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningSessionOutline`: Exposes CRUD operations for the **LearningSessionOutline** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningSessionOutlines
    * const learningSessionOutlines = await prisma.learningSessionOutline.findMany()
    * ```
    */
  get learningSessionOutline(): Prisma.LearningSessionOutlineDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.learningJourneyStep`: Exposes CRUD operations for the **LearningJourneyStep** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LearningJourneySteps
    * const learningJourneySteps = await prisma.learningJourneyStep.findMany()
    * ```
    */
  get learningJourneyStep(): Prisma.LearningJourneyStepDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.1.0
   * Query Engine version: ab635e6b9d606fa5c8fb8b1a7f909c3c3c1c98ba
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserGoal: 'UserGoal',
    LearningSessionChat: 'LearningSessionChat',
    Message: 'Message',
    LearningJourney: 'LearningJourney',
    LearningSessionOutline: 'LearningSessionOutline',
    LearningJourneyStep: 'LearningJourneyStep'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userGoal" | "learningSessionChat" | "message" | "learningJourney" | "learningSessionOutline" | "learningJourneyStep"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserGoal: {
        payload: Prisma.$UserGoalPayload<ExtArgs>
        fields: Prisma.UserGoalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserGoalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserGoalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>
          }
          findFirst: {
            args: Prisma.UserGoalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserGoalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>
          }
          findMany: {
            args: Prisma.UserGoalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>[]
          }
          create: {
            args: Prisma.UserGoalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>
          }
          createMany: {
            args: Prisma.UserGoalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserGoalCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>[]
          }
          delete: {
            args: Prisma.UserGoalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>
          }
          update: {
            args: Prisma.UserGoalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>
          }
          deleteMany: {
            args: Prisma.UserGoalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserGoalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserGoalUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>[]
          }
          upsert: {
            args: Prisma.UserGoalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserGoalPayload>
          }
          aggregate: {
            args: Prisma.UserGoalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserGoal>
          }
          groupBy: {
            args: Prisma.UserGoalGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGoalGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserGoalCountArgs<ExtArgs>
            result: $Utils.Optional<UserGoalCountAggregateOutputType> | number
          }
        }
      }
      LearningSessionChat: {
        payload: Prisma.$LearningSessionChatPayload<ExtArgs>
        fields: Prisma.LearningSessionChatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningSessionChatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningSessionChatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>
          }
          findFirst: {
            args: Prisma.LearningSessionChatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningSessionChatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>
          }
          findMany: {
            args: Prisma.LearningSessionChatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>[]
          }
          create: {
            args: Prisma.LearningSessionChatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>
          }
          createMany: {
            args: Prisma.LearningSessionChatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningSessionChatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>[]
          }
          delete: {
            args: Prisma.LearningSessionChatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>
          }
          update: {
            args: Prisma.LearningSessionChatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>
          }
          deleteMany: {
            args: Prisma.LearningSessionChatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningSessionChatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningSessionChatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>[]
          }
          upsert: {
            args: Prisma.LearningSessionChatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionChatPayload>
          }
          aggregate: {
            args: Prisma.LearningSessionChatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningSessionChat>
          }
          groupBy: {
            args: Prisma.LearningSessionChatGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningSessionChatGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningSessionChatCountArgs<ExtArgs>
            result: $Utils.Optional<LearningSessionChatCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      LearningJourney: {
        payload: Prisma.$LearningJourneyPayload<ExtArgs>
        fields: Prisma.LearningJourneyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningJourneyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningJourneyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>
          }
          findFirst: {
            args: Prisma.LearningJourneyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningJourneyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>
          }
          findMany: {
            args: Prisma.LearningJourneyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>[]
          }
          create: {
            args: Prisma.LearningJourneyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>
          }
          createMany: {
            args: Prisma.LearningJourneyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningJourneyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>[]
          }
          delete: {
            args: Prisma.LearningJourneyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>
          }
          update: {
            args: Prisma.LearningJourneyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>
          }
          deleteMany: {
            args: Prisma.LearningJourneyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningJourneyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningJourneyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>[]
          }
          upsert: {
            args: Prisma.LearningJourneyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyPayload>
          }
          aggregate: {
            args: Prisma.LearningJourneyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningJourney>
          }
          groupBy: {
            args: Prisma.LearningJourneyGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningJourneyGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningJourneyCountArgs<ExtArgs>
            result: $Utils.Optional<LearningJourneyCountAggregateOutputType> | number
          }
        }
      }
      LearningSessionOutline: {
        payload: Prisma.$LearningSessionOutlinePayload<ExtArgs>
        fields: Prisma.LearningSessionOutlineFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningSessionOutlineFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningSessionOutlineFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>
          }
          findFirst: {
            args: Prisma.LearningSessionOutlineFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningSessionOutlineFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>
          }
          findMany: {
            args: Prisma.LearningSessionOutlineFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>[]
          }
          create: {
            args: Prisma.LearningSessionOutlineCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>
          }
          createMany: {
            args: Prisma.LearningSessionOutlineCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningSessionOutlineCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>[]
          }
          delete: {
            args: Prisma.LearningSessionOutlineDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>
          }
          update: {
            args: Prisma.LearningSessionOutlineUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>
          }
          deleteMany: {
            args: Prisma.LearningSessionOutlineDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningSessionOutlineUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningSessionOutlineUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>[]
          }
          upsert: {
            args: Prisma.LearningSessionOutlineUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningSessionOutlinePayload>
          }
          aggregate: {
            args: Prisma.LearningSessionOutlineAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningSessionOutline>
          }
          groupBy: {
            args: Prisma.LearningSessionOutlineGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningSessionOutlineGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningSessionOutlineCountArgs<ExtArgs>
            result: $Utils.Optional<LearningSessionOutlineCountAggregateOutputType> | number
          }
        }
      }
      LearningJourneyStep: {
        payload: Prisma.$LearningJourneyStepPayload<ExtArgs>
        fields: Prisma.LearningJourneyStepFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LearningJourneyStepFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LearningJourneyStepFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>
          }
          findFirst: {
            args: Prisma.LearningJourneyStepFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LearningJourneyStepFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>
          }
          findMany: {
            args: Prisma.LearningJourneyStepFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>[]
          }
          create: {
            args: Prisma.LearningJourneyStepCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>
          }
          createMany: {
            args: Prisma.LearningJourneyStepCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LearningJourneyStepCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>[]
          }
          delete: {
            args: Prisma.LearningJourneyStepDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>
          }
          update: {
            args: Prisma.LearningJourneyStepUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>
          }
          deleteMany: {
            args: Prisma.LearningJourneyStepDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LearningJourneyStepUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LearningJourneyStepUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>[]
          }
          upsert: {
            args: Prisma.LearningJourneyStepUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LearningJourneyStepPayload>
          }
          aggregate: {
            args: Prisma.LearningJourneyStepAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLearningJourneyStep>
          }
          groupBy: {
            args: Prisma.LearningJourneyStepGroupByArgs<ExtArgs>
            result: $Utils.Optional<LearningJourneyStepGroupByOutputType>[]
          }
          count: {
            args: Prisma.LearningJourneyStepCountArgs<ExtArgs>
            result: $Utils.Optional<LearningJourneyStepCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userGoal?: UserGoalOmit
    learningSessionChat?: LearningSessionChatOmit
    message?: MessageOmit
    learningJourney?: LearningJourneyOmit
    learningSessionOutline?: LearningSessionOutlineOmit
    learningJourneyStep?: LearningJourneyStepOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    chats: number
    journeys: number
    goals: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | UserCountOutputTypeCountChatsArgs
    journeys?: boolean | UserCountOutputTypeCountJourneysArgs
    goals?: boolean | UserCountOutputTypeCountGoalsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningSessionChatWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountJourneysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningJourneyWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountGoalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGoalWhereInput
  }


  /**
   * Count Type LearningSessionChatCountOutputType
   */

  export type LearningSessionChatCountOutputType = {
    messages: number
  }

  export type LearningSessionChatCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | LearningSessionChatCountOutputTypeCountMessagesArgs
  }

  // Custom InputTypes
  /**
   * LearningSessionChatCountOutputType without action
   */
  export type LearningSessionChatCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChatCountOutputType
     */
    select?: LearningSessionChatCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearningSessionChatCountOutputType without action
   */
  export type LearningSessionChatCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }


  /**
   * Count Type LearningJourneyCountOutputType
   */

  export type LearningJourneyCountOutputType = {
    steps: number
  }

  export type LearningJourneyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | LearningJourneyCountOutputTypeCountStepsArgs
  }

  // Custom InputTypes
  /**
   * LearningJourneyCountOutputType without action
   */
  export type LearningJourneyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyCountOutputType
     */
    select?: LearningJourneyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearningJourneyCountOutputType without action
   */
  export type LearningJourneyCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningJourneyStepWhereInput
  }


  /**
   * Count Type LearningSessionOutlineCountOutputType
   */

  export type LearningSessionOutlineCountOutputType = {
    steps: number
    learningSessionChats: number
  }

  export type LearningSessionOutlineCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | LearningSessionOutlineCountOutputTypeCountStepsArgs
    learningSessionChats?: boolean | LearningSessionOutlineCountOutputTypeCountLearningSessionChatsArgs
  }

  // Custom InputTypes
  /**
   * LearningSessionOutlineCountOutputType without action
   */
  export type LearningSessionOutlineCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutlineCountOutputType
     */
    select?: LearningSessionOutlineCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearningSessionOutlineCountOutputType without action
   */
  export type LearningSessionOutlineCountOutputTypeCountStepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningJourneyStepWhereInput
  }

  /**
   * LearningSessionOutlineCountOutputType without action
   */
  export type LearningSessionOutlineCountOutputTypeCountLearningSessionChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningSessionChatWhereInput
  }


  /**
   * Count Type LearningJourneyStepCountOutputType
   */

  export type LearningJourneyStepCountOutputType = {
    chats: number
  }

  export type LearningJourneyStepCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | LearningJourneyStepCountOutputTypeCountChatsArgs
  }

  // Custom InputTypes
  /**
   * LearningJourneyStepCountOutputType without action
   */
  export type LearningJourneyStepCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStepCountOutputType
     */
    select?: LearningJourneyStepCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LearningJourneyStepCountOutputType without action
   */
  export type LearningJourneyStepCountOutputTypeCountChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningSessionChatWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    picture: string | null
    role: string | null
    botRole: string | null
    profileTour: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    passwordHash: string | null
    picture: string | null
    role: string | null
    botRole: string | null
    profileTour: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    passwordHash: number
    picture: number
    role: number
    botRole: number
    profileTour: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    passwordHash?: true
    picture?: true
    role?: true
    botRole?: true
    profileTour?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    passwordHash?: true
    picture?: true
    role?: true
    botRole?: true
    profileTour?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    passwordHash?: true
    picture?: true
    role?: true
    botRole?: true
    profileTour?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string | null
    email: string | null
    phone: string | null
    passwordHash: string
    picture: string | null
    role: string
    botRole: string
    profileTour: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    picture?: boolean
    role?: boolean
    botRole?: boolean
    profileTour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    chats?: boolean | User$chatsArgs<ExtArgs>
    journeys?: boolean | User$journeysArgs<ExtArgs>
    goals?: boolean | User$goalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    picture?: boolean
    role?: boolean
    botRole?: boolean
    profileTour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    picture?: boolean
    role?: boolean
    botRole?: boolean
    profileTour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    passwordHash?: boolean
    picture?: boolean
    role?: boolean
    botRole?: boolean
    profileTour?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "passwordHash" | "picture" | "role" | "botRole" | "profileTour" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chats?: boolean | User$chatsArgs<ExtArgs>
    journeys?: boolean | User$journeysArgs<ExtArgs>
    goals?: boolean | User$goalsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      chats: Prisma.$LearningSessionChatPayload<ExtArgs>[]
      journeys: Prisma.$LearningJourneyPayload<ExtArgs>[]
      goals: Prisma.$UserGoalPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      email: string | null
      phone: string | null
      passwordHash: string
      picture: string | null
      role: string
      botRole: string
      profileTour: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chats<T extends User$chatsArgs<ExtArgs> = {}>(args?: Subset<T, User$chatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    journeys<T extends User$journeysArgs<ExtArgs> = {}>(args?: Subset<T, User$journeysArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    goals<T extends User$goalsArgs<ExtArgs> = {}>(args?: Subset<T, User$goalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly picture: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly botRole: FieldRef<"User", 'String'>
    readonly profileTour: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.chats
   */
  export type User$chatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    where?: LearningSessionChatWhereInput
    orderBy?: LearningSessionChatOrderByWithRelationInput | LearningSessionChatOrderByWithRelationInput[]
    cursor?: LearningSessionChatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningSessionChatScalarFieldEnum | LearningSessionChatScalarFieldEnum[]
  }

  /**
   * User.journeys
   */
  export type User$journeysArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    where?: LearningJourneyWhereInput
    orderBy?: LearningJourneyOrderByWithRelationInput | LearningJourneyOrderByWithRelationInput[]
    cursor?: LearningJourneyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningJourneyScalarFieldEnum | LearningJourneyScalarFieldEnum[]
  }

  /**
   * User.goals
   */
  export type User$goalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    where?: UserGoalWhereInput
    orderBy?: UserGoalOrderByWithRelationInput | UserGoalOrderByWithRelationInput[]
    cursor?: UserGoalWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserGoalScalarFieldEnum | UserGoalScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserGoal
   */

  export type AggregateUserGoal = {
    _count: UserGoalCountAggregateOutputType | null
    _min: UserGoalMinAggregateOutputType | null
    _max: UserGoalMaxAggregateOutputType | null
  }

  export type UserGoalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    statement: string | null
    status: $Enums.GoalStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserGoalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    statement: string | null
    status: $Enums.GoalStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserGoalCountAggregateOutputType = {
    id: number
    userId: number
    statement: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserGoalMinAggregateInputType = {
    id?: true
    userId?: true
    statement?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserGoalMaxAggregateInputType = {
    id?: true
    userId?: true
    statement?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserGoalCountAggregateInputType = {
    id?: true
    userId?: true
    statement?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserGoalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGoal to aggregate.
     */
    where?: UserGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGoals to fetch.
     */
    orderBy?: UserGoalOrderByWithRelationInput | UserGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserGoals
    **/
    _count?: true | UserGoalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserGoalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserGoalMaxAggregateInputType
  }

  export type GetUserGoalAggregateType<T extends UserGoalAggregateArgs> = {
        [P in keyof T & keyof AggregateUserGoal]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserGoal[P]>
      : GetScalarType<T[P], AggregateUserGoal[P]>
  }




  export type UserGoalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserGoalWhereInput
    orderBy?: UserGoalOrderByWithAggregationInput | UserGoalOrderByWithAggregationInput[]
    by: UserGoalScalarFieldEnum[] | UserGoalScalarFieldEnum
    having?: UserGoalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserGoalCountAggregateInputType | true
    _min?: UserGoalMinAggregateInputType
    _max?: UserGoalMaxAggregateInputType
  }

  export type UserGoalGroupByOutputType = {
    id: string
    userId: string
    statement: string
    status: $Enums.GoalStatus
    createdAt: Date
    updatedAt: Date
    _count: UserGoalCountAggregateOutputType | null
    _min: UserGoalMinAggregateOutputType | null
    _max: UserGoalMaxAggregateOutputType | null
  }

  type GetUserGoalGroupByPayload<T extends UserGoalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGoalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGoalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGoalGroupByOutputType[P]>
            : GetScalarType<T[P], UserGoalGroupByOutputType[P]>
        }
      >
    >


  export type UserGoalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statement?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGoal"]>

  export type UserGoalSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statement?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGoal"]>

  export type UserGoalSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    statement?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userGoal"]>

  export type UserGoalSelectScalar = {
    id?: boolean
    userId?: boolean
    statement?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserGoalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "statement" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["userGoal"]>
  export type UserGoalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGoalIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserGoalIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserGoalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserGoal"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      statement: string
      status: $Enums.GoalStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userGoal"]>
    composites: {}
  }

  type UserGoalGetPayload<S extends boolean | null | undefined | UserGoalDefaultArgs> = $Result.GetResult<Prisma.$UserGoalPayload, S>

  type UserGoalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserGoalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserGoalCountAggregateInputType | true
    }

  export interface UserGoalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserGoal'], meta: { name: 'UserGoal' } }
    /**
     * Find zero or one UserGoal that matches the filter.
     * @param {UserGoalFindUniqueArgs} args - Arguments to find a UserGoal
     * @example
     * // Get one UserGoal
     * const userGoal = await prisma.userGoal.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserGoalFindUniqueArgs>(args: SelectSubset<T, UserGoalFindUniqueArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserGoal that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserGoalFindUniqueOrThrowArgs} args - Arguments to find a UserGoal
     * @example
     * // Get one UserGoal
     * const userGoal = await prisma.userGoal.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserGoalFindUniqueOrThrowArgs>(args: SelectSubset<T, UserGoalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGoal that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGoalFindFirstArgs} args - Arguments to find a UserGoal
     * @example
     * // Get one UserGoal
     * const userGoal = await prisma.userGoal.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserGoalFindFirstArgs>(args?: SelectSubset<T, UserGoalFindFirstArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserGoal that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGoalFindFirstOrThrowArgs} args - Arguments to find a UserGoal
     * @example
     * // Get one UserGoal
     * const userGoal = await prisma.userGoal.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserGoalFindFirstOrThrowArgs>(args?: SelectSubset<T, UserGoalFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserGoals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGoalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserGoals
     * const userGoals = await prisma.userGoal.findMany()
     * 
     * // Get first 10 UserGoals
     * const userGoals = await prisma.userGoal.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userGoalWithIdOnly = await prisma.userGoal.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserGoalFindManyArgs>(args?: SelectSubset<T, UserGoalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserGoal.
     * @param {UserGoalCreateArgs} args - Arguments to create a UserGoal.
     * @example
     * // Create one UserGoal
     * const UserGoal = await prisma.userGoal.create({
     *   data: {
     *     // ... data to create a UserGoal
     *   }
     * })
     * 
     */
    create<T extends UserGoalCreateArgs>(args: SelectSubset<T, UserGoalCreateArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserGoals.
     * @param {UserGoalCreateManyArgs} args - Arguments to create many UserGoals.
     * @example
     * // Create many UserGoals
     * const userGoal = await prisma.userGoal.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserGoalCreateManyArgs>(args?: SelectSubset<T, UserGoalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserGoals and returns the data saved in the database.
     * @param {UserGoalCreateManyAndReturnArgs} args - Arguments to create many UserGoals.
     * @example
     * // Create many UserGoals
     * const userGoal = await prisma.userGoal.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserGoals and only return the `id`
     * const userGoalWithIdOnly = await prisma.userGoal.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserGoalCreateManyAndReturnArgs>(args?: SelectSubset<T, UserGoalCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserGoal.
     * @param {UserGoalDeleteArgs} args - Arguments to delete one UserGoal.
     * @example
     * // Delete one UserGoal
     * const UserGoal = await prisma.userGoal.delete({
     *   where: {
     *     // ... filter to delete one UserGoal
     *   }
     * })
     * 
     */
    delete<T extends UserGoalDeleteArgs>(args: SelectSubset<T, UserGoalDeleteArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserGoal.
     * @param {UserGoalUpdateArgs} args - Arguments to update one UserGoal.
     * @example
     * // Update one UserGoal
     * const userGoal = await prisma.userGoal.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserGoalUpdateArgs>(args: SelectSubset<T, UserGoalUpdateArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserGoals.
     * @param {UserGoalDeleteManyArgs} args - Arguments to filter UserGoals to delete.
     * @example
     * // Delete a few UserGoals
     * const { count } = await prisma.userGoal.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserGoalDeleteManyArgs>(args?: SelectSubset<T, UserGoalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGoalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserGoals
     * const userGoal = await prisma.userGoal.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserGoalUpdateManyArgs>(args: SelectSubset<T, UserGoalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserGoals and returns the data updated in the database.
     * @param {UserGoalUpdateManyAndReturnArgs} args - Arguments to update many UserGoals.
     * @example
     * // Update many UserGoals
     * const userGoal = await prisma.userGoal.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserGoals and only return the `id`
     * const userGoalWithIdOnly = await prisma.userGoal.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserGoalUpdateManyAndReturnArgs>(args: SelectSubset<T, UserGoalUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserGoal.
     * @param {UserGoalUpsertArgs} args - Arguments to update or create a UserGoal.
     * @example
     * // Update or create a UserGoal
     * const userGoal = await prisma.userGoal.upsert({
     *   create: {
     *     // ... data to create a UserGoal
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserGoal we want to update
     *   }
     * })
     */
    upsert<T extends UserGoalUpsertArgs>(args: SelectSubset<T, UserGoalUpsertArgs<ExtArgs>>): Prisma__UserGoalClient<$Result.GetResult<Prisma.$UserGoalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserGoals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGoalCountArgs} args - Arguments to filter UserGoals to count.
     * @example
     * // Count the number of UserGoals
     * const count = await prisma.userGoal.count({
     *   where: {
     *     // ... the filter for the UserGoals we want to count
     *   }
     * })
    **/
    count<T extends UserGoalCountArgs>(
      args?: Subset<T, UserGoalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserGoalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGoalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserGoalAggregateArgs>(args: Subset<T, UserGoalAggregateArgs>): Prisma.PrismaPromise<GetUserGoalAggregateType<T>>

    /**
     * Group by UserGoal.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGoalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGoalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGoalGroupByArgs['orderBy'] }
        : { orderBy?: UserGoalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGoalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGoalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserGoal model
   */
  readonly fields: UserGoalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserGoal.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserGoalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserGoal model
   */
  interface UserGoalFieldRefs {
    readonly id: FieldRef<"UserGoal", 'String'>
    readonly userId: FieldRef<"UserGoal", 'String'>
    readonly statement: FieldRef<"UserGoal", 'String'>
    readonly status: FieldRef<"UserGoal", 'GoalStatus'>
    readonly createdAt: FieldRef<"UserGoal", 'DateTime'>
    readonly updatedAt: FieldRef<"UserGoal", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserGoal findUnique
   */
  export type UserGoalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * Filter, which UserGoal to fetch.
     */
    where: UserGoalWhereUniqueInput
  }

  /**
   * UserGoal findUniqueOrThrow
   */
  export type UserGoalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * Filter, which UserGoal to fetch.
     */
    where: UserGoalWhereUniqueInput
  }

  /**
   * UserGoal findFirst
   */
  export type UserGoalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * Filter, which UserGoal to fetch.
     */
    where?: UserGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGoals to fetch.
     */
    orderBy?: UserGoalOrderByWithRelationInput | UserGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGoals.
     */
    cursor?: UserGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGoals.
     */
    distinct?: UserGoalScalarFieldEnum | UserGoalScalarFieldEnum[]
  }

  /**
   * UserGoal findFirstOrThrow
   */
  export type UserGoalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * Filter, which UserGoal to fetch.
     */
    where?: UserGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGoals to fetch.
     */
    orderBy?: UserGoalOrderByWithRelationInput | UserGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserGoals.
     */
    cursor?: UserGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGoals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserGoals.
     */
    distinct?: UserGoalScalarFieldEnum | UserGoalScalarFieldEnum[]
  }

  /**
   * UserGoal findMany
   */
  export type UserGoalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * Filter, which UserGoals to fetch.
     */
    where?: UserGoalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserGoals to fetch.
     */
    orderBy?: UserGoalOrderByWithRelationInput | UserGoalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserGoals.
     */
    cursor?: UserGoalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserGoals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserGoals.
     */
    skip?: number
    distinct?: UserGoalScalarFieldEnum | UserGoalScalarFieldEnum[]
  }

  /**
   * UserGoal create
   */
  export type UserGoalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * The data needed to create a UserGoal.
     */
    data: XOR<UserGoalCreateInput, UserGoalUncheckedCreateInput>
  }

  /**
   * UserGoal createMany
   */
  export type UserGoalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserGoals.
     */
    data: UserGoalCreateManyInput | UserGoalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserGoal createManyAndReturn
   */
  export type UserGoalCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * The data used to create many UserGoals.
     */
    data: UserGoalCreateManyInput | UserGoalCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGoal update
   */
  export type UserGoalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * The data needed to update a UserGoal.
     */
    data: XOR<UserGoalUpdateInput, UserGoalUncheckedUpdateInput>
    /**
     * Choose, which UserGoal to update.
     */
    where: UserGoalWhereUniqueInput
  }

  /**
   * UserGoal updateMany
   */
  export type UserGoalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserGoals.
     */
    data: XOR<UserGoalUpdateManyMutationInput, UserGoalUncheckedUpdateManyInput>
    /**
     * Filter which UserGoals to update
     */
    where?: UserGoalWhereInput
    /**
     * Limit how many UserGoals to update.
     */
    limit?: number
  }

  /**
   * UserGoal updateManyAndReturn
   */
  export type UserGoalUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * The data used to update UserGoals.
     */
    data: XOR<UserGoalUpdateManyMutationInput, UserGoalUncheckedUpdateManyInput>
    /**
     * Filter which UserGoals to update
     */
    where?: UserGoalWhereInput
    /**
     * Limit how many UserGoals to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserGoal upsert
   */
  export type UserGoalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * The filter to search for the UserGoal to update in case it exists.
     */
    where: UserGoalWhereUniqueInput
    /**
     * In case the UserGoal found by the `where` argument doesn't exist, create a new UserGoal with this data.
     */
    create: XOR<UserGoalCreateInput, UserGoalUncheckedCreateInput>
    /**
     * In case the UserGoal was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserGoalUpdateInput, UserGoalUncheckedUpdateInput>
  }

  /**
   * UserGoal delete
   */
  export type UserGoalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
    /**
     * Filter which UserGoal to delete.
     */
    where: UserGoalWhereUniqueInput
  }

  /**
   * UserGoal deleteMany
   */
  export type UserGoalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserGoals to delete
     */
    where?: UserGoalWhereInput
    /**
     * Limit how many UserGoals to delete.
     */
    limit?: number
  }

  /**
   * UserGoal without action
   */
  export type UserGoalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserGoal
     */
    select?: UserGoalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserGoal
     */
    omit?: UserGoalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserGoalInclude<ExtArgs> | null
  }


  /**
   * Model LearningSessionChat
   */

  export type AggregateLearningSessionChat = {
    _count: LearningSessionChatCountAggregateOutputType | null
    _min: LearningSessionChatMinAggregateOutputType | null
    _max: LearningSessionChatMaxAggregateOutputType | null
  }

  export type LearningSessionChatMinAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionOutlineId: string | null
    stepId: string | null
    sessionTitle: string | null
    startedAt: Date | null
    endedAt: Date | null
    lastMessageAt: Date | null
  }

  export type LearningSessionChatMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    sessionOutlineId: string | null
    stepId: string | null
    sessionTitle: string | null
    startedAt: Date | null
    endedAt: Date | null
    lastMessageAt: Date | null
  }

  export type LearningSessionChatCountAggregateOutputType = {
    id: number
    userId: number
    sessionOutlineId: number
    stepId: number
    sessionTitle: number
    startedAt: number
    endedAt: number
    lastMessageAt: number
    metadata: number
    _all: number
  }


  export type LearningSessionChatMinAggregateInputType = {
    id?: true
    userId?: true
    sessionOutlineId?: true
    stepId?: true
    sessionTitle?: true
    startedAt?: true
    endedAt?: true
    lastMessageAt?: true
  }

  export type LearningSessionChatMaxAggregateInputType = {
    id?: true
    userId?: true
    sessionOutlineId?: true
    stepId?: true
    sessionTitle?: true
    startedAt?: true
    endedAt?: true
    lastMessageAt?: true
  }

  export type LearningSessionChatCountAggregateInputType = {
    id?: true
    userId?: true
    sessionOutlineId?: true
    stepId?: true
    sessionTitle?: true
    startedAt?: true
    endedAt?: true
    lastMessageAt?: true
    metadata?: true
    _all?: true
  }

  export type LearningSessionChatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningSessionChat to aggregate.
     */
    where?: LearningSessionChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionChats to fetch.
     */
    orderBy?: LearningSessionChatOrderByWithRelationInput | LearningSessionChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningSessionChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionChats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningSessionChats
    **/
    _count?: true | LearningSessionChatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningSessionChatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningSessionChatMaxAggregateInputType
  }

  export type GetLearningSessionChatAggregateType<T extends LearningSessionChatAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningSessionChat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningSessionChat[P]>
      : GetScalarType<T[P], AggregateLearningSessionChat[P]>
  }




  export type LearningSessionChatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningSessionChatWhereInput
    orderBy?: LearningSessionChatOrderByWithAggregationInput | LearningSessionChatOrderByWithAggregationInput[]
    by: LearningSessionChatScalarFieldEnum[] | LearningSessionChatScalarFieldEnum
    having?: LearningSessionChatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningSessionChatCountAggregateInputType | true
    _min?: LearningSessionChatMinAggregateInputType
    _max?: LearningSessionChatMaxAggregateInputType
  }

  export type LearningSessionChatGroupByOutputType = {
    id: string
    userId: string | null
    sessionOutlineId: string | null
    stepId: string | null
    sessionTitle: string | null
    startedAt: Date
    endedAt: Date | null
    lastMessageAt: Date | null
    metadata: JsonValue | null
    _count: LearningSessionChatCountAggregateOutputType | null
    _min: LearningSessionChatMinAggregateOutputType | null
    _max: LearningSessionChatMaxAggregateOutputType | null
  }

  type GetLearningSessionChatGroupByPayload<T extends LearningSessionChatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningSessionChatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningSessionChatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningSessionChatGroupByOutputType[P]>
            : GetScalarType<T[P], LearningSessionChatGroupByOutputType[P]>
        }
      >
    >


  export type LearningSessionChatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionOutlineId?: boolean
    stepId?: boolean
    sessionTitle?: boolean
    startedAt?: boolean
    endedAt?: boolean
    lastMessageAt?: boolean
    metadata?: boolean
    user?: boolean | LearningSessionChat$userArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionChat$sessionOutlineArgs<ExtArgs>
    step?: boolean | LearningSessionChat$stepArgs<ExtArgs>
    messages?: boolean | LearningSessionChat$messagesArgs<ExtArgs>
    _count?: boolean | LearningSessionChatCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningSessionChat"]>

  export type LearningSessionChatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionOutlineId?: boolean
    stepId?: boolean
    sessionTitle?: boolean
    startedAt?: boolean
    endedAt?: boolean
    lastMessageAt?: boolean
    metadata?: boolean
    user?: boolean | LearningSessionChat$userArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionChat$sessionOutlineArgs<ExtArgs>
    step?: boolean | LearningSessionChat$stepArgs<ExtArgs>
  }, ExtArgs["result"]["learningSessionChat"]>

  export type LearningSessionChatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    sessionOutlineId?: boolean
    stepId?: boolean
    sessionTitle?: boolean
    startedAt?: boolean
    endedAt?: boolean
    lastMessageAt?: boolean
    metadata?: boolean
    user?: boolean | LearningSessionChat$userArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionChat$sessionOutlineArgs<ExtArgs>
    step?: boolean | LearningSessionChat$stepArgs<ExtArgs>
  }, ExtArgs["result"]["learningSessionChat"]>

  export type LearningSessionChatSelectScalar = {
    id?: boolean
    userId?: boolean
    sessionOutlineId?: boolean
    stepId?: boolean
    sessionTitle?: boolean
    startedAt?: boolean
    endedAt?: boolean
    lastMessageAt?: boolean
    metadata?: boolean
  }

  export type LearningSessionChatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "sessionOutlineId" | "stepId" | "sessionTitle" | "startedAt" | "endedAt" | "lastMessageAt" | "metadata", ExtArgs["result"]["learningSessionChat"]>
  export type LearningSessionChatInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | LearningSessionChat$userArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionChat$sessionOutlineArgs<ExtArgs>
    step?: boolean | LearningSessionChat$stepArgs<ExtArgs>
    messages?: boolean | LearningSessionChat$messagesArgs<ExtArgs>
    _count?: boolean | LearningSessionChatCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearningSessionChatIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | LearningSessionChat$userArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionChat$sessionOutlineArgs<ExtArgs>
    step?: boolean | LearningSessionChat$stepArgs<ExtArgs>
  }
  export type LearningSessionChatIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | LearningSessionChat$userArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionChat$sessionOutlineArgs<ExtArgs>
    step?: boolean | LearningSessionChat$stepArgs<ExtArgs>
  }

  export type $LearningSessionChatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningSessionChat"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      sessionOutline: Prisma.$LearningSessionOutlinePayload<ExtArgs> | null
      step: Prisma.$LearningJourneyStepPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      sessionOutlineId: string | null
      stepId: string | null
      sessionTitle: string | null
      startedAt: Date
      endedAt: Date | null
      lastMessageAt: Date | null
      metadata: Prisma.JsonValue | null
    }, ExtArgs["result"]["learningSessionChat"]>
    composites: {}
  }

  type LearningSessionChatGetPayload<S extends boolean | null | undefined | LearningSessionChatDefaultArgs> = $Result.GetResult<Prisma.$LearningSessionChatPayload, S>

  type LearningSessionChatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningSessionChatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningSessionChatCountAggregateInputType | true
    }

  export interface LearningSessionChatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningSessionChat'], meta: { name: 'LearningSessionChat' } }
    /**
     * Find zero or one LearningSessionChat that matches the filter.
     * @param {LearningSessionChatFindUniqueArgs} args - Arguments to find a LearningSessionChat
     * @example
     * // Get one LearningSessionChat
     * const learningSessionChat = await prisma.learningSessionChat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningSessionChatFindUniqueArgs>(args: SelectSubset<T, LearningSessionChatFindUniqueArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningSessionChat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningSessionChatFindUniqueOrThrowArgs} args - Arguments to find a LearningSessionChat
     * @example
     * // Get one LearningSessionChat
     * const learningSessionChat = await prisma.learningSessionChat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningSessionChatFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningSessionChatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningSessionChat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionChatFindFirstArgs} args - Arguments to find a LearningSessionChat
     * @example
     * // Get one LearningSessionChat
     * const learningSessionChat = await prisma.learningSessionChat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningSessionChatFindFirstArgs>(args?: SelectSubset<T, LearningSessionChatFindFirstArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningSessionChat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionChatFindFirstOrThrowArgs} args - Arguments to find a LearningSessionChat
     * @example
     * // Get one LearningSessionChat
     * const learningSessionChat = await prisma.learningSessionChat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningSessionChatFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningSessionChatFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningSessionChats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionChatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningSessionChats
     * const learningSessionChats = await prisma.learningSessionChat.findMany()
     * 
     * // Get first 10 LearningSessionChats
     * const learningSessionChats = await prisma.learningSessionChat.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningSessionChatWithIdOnly = await prisma.learningSessionChat.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningSessionChatFindManyArgs>(args?: SelectSubset<T, LearningSessionChatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningSessionChat.
     * @param {LearningSessionChatCreateArgs} args - Arguments to create a LearningSessionChat.
     * @example
     * // Create one LearningSessionChat
     * const LearningSessionChat = await prisma.learningSessionChat.create({
     *   data: {
     *     // ... data to create a LearningSessionChat
     *   }
     * })
     * 
     */
    create<T extends LearningSessionChatCreateArgs>(args: SelectSubset<T, LearningSessionChatCreateArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningSessionChats.
     * @param {LearningSessionChatCreateManyArgs} args - Arguments to create many LearningSessionChats.
     * @example
     * // Create many LearningSessionChats
     * const learningSessionChat = await prisma.learningSessionChat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningSessionChatCreateManyArgs>(args?: SelectSubset<T, LearningSessionChatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningSessionChats and returns the data saved in the database.
     * @param {LearningSessionChatCreateManyAndReturnArgs} args - Arguments to create many LearningSessionChats.
     * @example
     * // Create many LearningSessionChats
     * const learningSessionChat = await prisma.learningSessionChat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningSessionChats and only return the `id`
     * const learningSessionChatWithIdOnly = await prisma.learningSessionChat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningSessionChatCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningSessionChatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningSessionChat.
     * @param {LearningSessionChatDeleteArgs} args - Arguments to delete one LearningSessionChat.
     * @example
     * // Delete one LearningSessionChat
     * const LearningSessionChat = await prisma.learningSessionChat.delete({
     *   where: {
     *     // ... filter to delete one LearningSessionChat
     *   }
     * })
     * 
     */
    delete<T extends LearningSessionChatDeleteArgs>(args: SelectSubset<T, LearningSessionChatDeleteArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningSessionChat.
     * @param {LearningSessionChatUpdateArgs} args - Arguments to update one LearningSessionChat.
     * @example
     * // Update one LearningSessionChat
     * const learningSessionChat = await prisma.learningSessionChat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningSessionChatUpdateArgs>(args: SelectSubset<T, LearningSessionChatUpdateArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningSessionChats.
     * @param {LearningSessionChatDeleteManyArgs} args - Arguments to filter LearningSessionChats to delete.
     * @example
     * // Delete a few LearningSessionChats
     * const { count } = await prisma.learningSessionChat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningSessionChatDeleteManyArgs>(args?: SelectSubset<T, LearningSessionChatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningSessionChats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionChatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningSessionChats
     * const learningSessionChat = await prisma.learningSessionChat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningSessionChatUpdateManyArgs>(args: SelectSubset<T, LearningSessionChatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningSessionChats and returns the data updated in the database.
     * @param {LearningSessionChatUpdateManyAndReturnArgs} args - Arguments to update many LearningSessionChats.
     * @example
     * // Update many LearningSessionChats
     * const learningSessionChat = await prisma.learningSessionChat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningSessionChats and only return the `id`
     * const learningSessionChatWithIdOnly = await prisma.learningSessionChat.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningSessionChatUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningSessionChatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningSessionChat.
     * @param {LearningSessionChatUpsertArgs} args - Arguments to update or create a LearningSessionChat.
     * @example
     * // Update or create a LearningSessionChat
     * const learningSessionChat = await prisma.learningSessionChat.upsert({
     *   create: {
     *     // ... data to create a LearningSessionChat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningSessionChat we want to update
     *   }
     * })
     */
    upsert<T extends LearningSessionChatUpsertArgs>(args: SelectSubset<T, LearningSessionChatUpsertArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningSessionChats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionChatCountArgs} args - Arguments to filter LearningSessionChats to count.
     * @example
     * // Count the number of LearningSessionChats
     * const count = await prisma.learningSessionChat.count({
     *   where: {
     *     // ... the filter for the LearningSessionChats we want to count
     *   }
     * })
    **/
    count<T extends LearningSessionChatCountArgs>(
      args?: Subset<T, LearningSessionChatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningSessionChatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningSessionChat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionChatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningSessionChatAggregateArgs>(args: Subset<T, LearningSessionChatAggregateArgs>): Prisma.PrismaPromise<GetLearningSessionChatAggregateType<T>>

    /**
     * Group by LearningSessionChat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionChatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningSessionChatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningSessionChatGroupByArgs['orderBy'] }
        : { orderBy?: LearningSessionChatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningSessionChatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningSessionChatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningSessionChat model
   */
  readonly fields: LearningSessionChatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningSessionChat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningSessionChatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends LearningSessionChat$userArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionChat$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    sessionOutline<T extends LearningSessionChat$sessionOutlineArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionChat$sessionOutlineArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    step<T extends LearningSessionChat$stepArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionChat$stepArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends LearningSessionChat$messagesArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionChat$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningSessionChat model
   */
  interface LearningSessionChatFieldRefs {
    readonly id: FieldRef<"LearningSessionChat", 'String'>
    readonly userId: FieldRef<"LearningSessionChat", 'String'>
    readonly sessionOutlineId: FieldRef<"LearningSessionChat", 'String'>
    readonly stepId: FieldRef<"LearningSessionChat", 'String'>
    readonly sessionTitle: FieldRef<"LearningSessionChat", 'String'>
    readonly startedAt: FieldRef<"LearningSessionChat", 'DateTime'>
    readonly endedAt: FieldRef<"LearningSessionChat", 'DateTime'>
    readonly lastMessageAt: FieldRef<"LearningSessionChat", 'DateTime'>
    readonly metadata: FieldRef<"LearningSessionChat", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * LearningSessionChat findUnique
   */
  export type LearningSessionChatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionChat to fetch.
     */
    where: LearningSessionChatWhereUniqueInput
  }

  /**
   * LearningSessionChat findUniqueOrThrow
   */
  export type LearningSessionChatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionChat to fetch.
     */
    where: LearningSessionChatWhereUniqueInput
  }

  /**
   * LearningSessionChat findFirst
   */
  export type LearningSessionChatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionChat to fetch.
     */
    where?: LearningSessionChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionChats to fetch.
     */
    orderBy?: LearningSessionChatOrderByWithRelationInput | LearningSessionChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningSessionChats.
     */
    cursor?: LearningSessionChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionChats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningSessionChats.
     */
    distinct?: LearningSessionChatScalarFieldEnum | LearningSessionChatScalarFieldEnum[]
  }

  /**
   * LearningSessionChat findFirstOrThrow
   */
  export type LearningSessionChatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionChat to fetch.
     */
    where?: LearningSessionChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionChats to fetch.
     */
    orderBy?: LearningSessionChatOrderByWithRelationInput | LearningSessionChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningSessionChats.
     */
    cursor?: LearningSessionChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionChats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningSessionChats.
     */
    distinct?: LearningSessionChatScalarFieldEnum | LearningSessionChatScalarFieldEnum[]
  }

  /**
   * LearningSessionChat findMany
   */
  export type LearningSessionChatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionChats to fetch.
     */
    where?: LearningSessionChatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionChats to fetch.
     */
    orderBy?: LearningSessionChatOrderByWithRelationInput | LearningSessionChatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningSessionChats.
     */
    cursor?: LearningSessionChatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionChats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionChats.
     */
    skip?: number
    distinct?: LearningSessionChatScalarFieldEnum | LearningSessionChatScalarFieldEnum[]
  }

  /**
   * LearningSessionChat create
   */
  export type LearningSessionChatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningSessionChat.
     */
    data: XOR<LearningSessionChatCreateInput, LearningSessionChatUncheckedCreateInput>
  }

  /**
   * LearningSessionChat createMany
   */
  export type LearningSessionChatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningSessionChats.
     */
    data: LearningSessionChatCreateManyInput | LearningSessionChatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningSessionChat createManyAndReturn
   */
  export type LearningSessionChatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * The data used to create many LearningSessionChats.
     */
    data: LearningSessionChatCreateManyInput | LearningSessionChatCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningSessionChat update
   */
  export type LearningSessionChatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningSessionChat.
     */
    data: XOR<LearningSessionChatUpdateInput, LearningSessionChatUncheckedUpdateInput>
    /**
     * Choose, which LearningSessionChat to update.
     */
    where: LearningSessionChatWhereUniqueInput
  }

  /**
   * LearningSessionChat updateMany
   */
  export type LearningSessionChatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningSessionChats.
     */
    data: XOR<LearningSessionChatUpdateManyMutationInput, LearningSessionChatUncheckedUpdateManyInput>
    /**
     * Filter which LearningSessionChats to update
     */
    where?: LearningSessionChatWhereInput
    /**
     * Limit how many LearningSessionChats to update.
     */
    limit?: number
  }

  /**
   * LearningSessionChat updateManyAndReturn
   */
  export type LearningSessionChatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * The data used to update LearningSessionChats.
     */
    data: XOR<LearningSessionChatUpdateManyMutationInput, LearningSessionChatUncheckedUpdateManyInput>
    /**
     * Filter which LearningSessionChats to update
     */
    where?: LearningSessionChatWhereInput
    /**
     * Limit how many LearningSessionChats to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningSessionChat upsert
   */
  export type LearningSessionChatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningSessionChat to update in case it exists.
     */
    where: LearningSessionChatWhereUniqueInput
    /**
     * In case the LearningSessionChat found by the `where` argument doesn't exist, create a new LearningSessionChat with this data.
     */
    create: XOR<LearningSessionChatCreateInput, LearningSessionChatUncheckedCreateInput>
    /**
     * In case the LearningSessionChat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningSessionChatUpdateInput, LearningSessionChatUncheckedUpdateInput>
  }

  /**
   * LearningSessionChat delete
   */
  export type LearningSessionChatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    /**
     * Filter which LearningSessionChat to delete.
     */
    where: LearningSessionChatWhereUniqueInput
  }

  /**
   * LearningSessionChat deleteMany
   */
  export type LearningSessionChatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningSessionChats to delete
     */
    where?: LearningSessionChatWhereInput
    /**
     * Limit how many LearningSessionChats to delete.
     */
    limit?: number
  }

  /**
   * LearningSessionChat.user
   */
  export type LearningSessionChat$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * LearningSessionChat.sessionOutline
   */
  export type LearningSessionChat$sessionOutlineArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    where?: LearningSessionOutlineWhereInput
  }

  /**
   * LearningSessionChat.step
   */
  export type LearningSessionChat$stepArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    where?: LearningJourneyStepWhereInput
  }

  /**
   * LearningSessionChat.messages
   */
  export type LearningSessionChat$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * LearningSessionChat without action
   */
  export type LearningSessionChatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    chatId: string | null
    role: string | null
    content: string | null
    createdAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    chatId: string | null
    role: string | null
    content: string | null
    createdAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    chatId: number
    role: number
    content: number
    command: number
    createdAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    chatId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    chatId?: true
    role?: true
    content?: true
    createdAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    chatId?: true
    role?: true
    content?: true
    command?: true
    createdAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    chatId: string
    role: string
    content: string
    command: JsonValue | null
    createdAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    role?: boolean
    content?: boolean
    command?: boolean
    createdAt?: boolean
    chat?: boolean | LearningSessionChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    role?: boolean
    content?: boolean
    command?: boolean
    createdAt?: boolean
    chat?: boolean | LearningSessionChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    chatId?: boolean
    role?: boolean
    content?: boolean
    command?: boolean
    createdAt?: boolean
    chat?: boolean | LearningSessionChatDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    chatId?: boolean
    role?: boolean
    content?: boolean
    command?: boolean
    createdAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "chatId" | "role" | "content" | "command" | "createdAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | LearningSessionChatDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | LearningSessionChatDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chat?: boolean | LearningSessionChatDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      chat: Prisma.$LearningSessionChatPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      chatId: string
      role: string
      content: string
      command: Prisma.JsonValue | null
      createdAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    chat<T extends LearningSessionChatDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionChatDefaultArgs<ExtArgs>>): Prisma__LearningSessionChatClient<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly chatId: FieldRef<"Message", 'String'>
    readonly role: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly command: FieldRef<"Message", 'Json'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model LearningJourney
   */

  export type AggregateLearningJourney = {
    _count: LearningJourneyCountAggregateOutputType | null
    _avg: LearningJourneyAvgAggregateOutputType | null
    _sum: LearningJourneySumAggregateOutputType | null
    _min: LearningJourneyMinAggregateOutputType | null
    _max: LearningJourneyMaxAggregateOutputType | null
  }

  export type LearningJourneyAvgAggregateOutputType = {
    order: number | null
  }

  export type LearningJourneySumAggregateOutputType = {
    order: number | null
  }

  export type LearningJourneyMinAggregateOutputType = {
    id: string | null
    slug: string | null
    order: number | null
    title: string | null
    intro: string | null
    isStandard: boolean | null
    personalizedForUserId: string | null
    userGoalSummary: string | null
    goalChatId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningJourneyMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    order: number | null
    title: string | null
    intro: string | null
    isStandard: boolean | null
    personalizedForUserId: string | null
    userGoalSummary: string | null
    goalChatId: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningJourneyCountAggregateOutputType = {
    id: number
    slug: number
    order: number
    title: number
    intro: number
    objectives: number
    isStandard: number
    personalizedForUserId: number
    userGoalSummary: number
    goalChatId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LearningJourneyAvgAggregateInputType = {
    order?: true
  }

  export type LearningJourneySumAggregateInputType = {
    order?: true
  }

  export type LearningJourneyMinAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    title?: true
    intro?: true
    isStandard?: true
    personalizedForUserId?: true
    userGoalSummary?: true
    goalChatId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningJourneyMaxAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    title?: true
    intro?: true
    isStandard?: true
    personalizedForUserId?: true
    userGoalSummary?: true
    goalChatId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningJourneyCountAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    title?: true
    intro?: true
    objectives?: true
    isStandard?: true
    personalizedForUserId?: true
    userGoalSummary?: true
    goalChatId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LearningJourneyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningJourney to aggregate.
     */
    where?: LearningJourneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneys to fetch.
     */
    orderBy?: LearningJourneyOrderByWithRelationInput | LearningJourneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningJourneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningJourneys
    **/
    _count?: true | LearningJourneyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningJourneyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningJourneySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningJourneyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningJourneyMaxAggregateInputType
  }

  export type GetLearningJourneyAggregateType<T extends LearningJourneyAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningJourney]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningJourney[P]>
      : GetScalarType<T[P], AggregateLearningJourney[P]>
  }




  export type LearningJourneyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningJourneyWhereInput
    orderBy?: LearningJourneyOrderByWithAggregationInput | LearningJourneyOrderByWithAggregationInput[]
    by: LearningJourneyScalarFieldEnum[] | LearningJourneyScalarFieldEnum
    having?: LearningJourneyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningJourneyCountAggregateInputType | true
    _avg?: LearningJourneyAvgAggregateInputType
    _sum?: LearningJourneySumAggregateInputType
    _min?: LearningJourneyMinAggregateInputType
    _max?: LearningJourneyMaxAggregateInputType
  }

  export type LearningJourneyGroupByOutputType = {
    id: string
    slug: string | null
    order: number | null
    title: string
    intro: string | null
    objectives: JsonValue | null
    isStandard: boolean
    personalizedForUserId: string | null
    userGoalSummary: string | null
    goalChatId: string | null
    status: string
    createdAt: Date
    updatedAt: Date
    _count: LearningJourneyCountAggregateOutputType | null
    _avg: LearningJourneyAvgAggregateOutputType | null
    _sum: LearningJourneySumAggregateOutputType | null
    _min: LearningJourneyMinAggregateOutputType | null
    _max: LearningJourneyMaxAggregateOutputType | null
  }

  type GetLearningJourneyGroupByPayload<T extends LearningJourneyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningJourneyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningJourneyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningJourneyGroupByOutputType[P]>
            : GetScalarType<T[P], LearningJourneyGroupByOutputType[P]>
        }
      >
    >


  export type LearningJourneySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    intro?: boolean
    objectives?: boolean
    isStandard?: boolean
    personalizedForUserId?: boolean
    userGoalSummary?: boolean
    goalChatId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    personalizedForUser?: boolean | LearningJourney$personalizedForUserArgs<ExtArgs>
    steps?: boolean | LearningJourney$stepsArgs<ExtArgs>
    _count?: boolean | LearningJourneyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningJourney"]>

  export type LearningJourneySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    intro?: boolean
    objectives?: boolean
    isStandard?: boolean
    personalizedForUserId?: boolean
    userGoalSummary?: boolean
    goalChatId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    personalizedForUser?: boolean | LearningJourney$personalizedForUserArgs<ExtArgs>
  }, ExtArgs["result"]["learningJourney"]>

  export type LearningJourneySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    intro?: boolean
    objectives?: boolean
    isStandard?: boolean
    personalizedForUserId?: boolean
    userGoalSummary?: boolean
    goalChatId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    personalizedForUser?: boolean | LearningJourney$personalizedForUserArgs<ExtArgs>
  }, ExtArgs["result"]["learningJourney"]>

  export type LearningJourneySelectScalar = {
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    intro?: boolean
    objectives?: boolean
    isStandard?: boolean
    personalizedForUserId?: boolean
    userGoalSummary?: boolean
    goalChatId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LearningJourneyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "order" | "title" | "intro" | "objectives" | "isStandard" | "personalizedForUserId" | "userGoalSummary" | "goalChatId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["learningJourney"]>
  export type LearningJourneyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    personalizedForUser?: boolean | LearningJourney$personalizedForUserArgs<ExtArgs>
    steps?: boolean | LearningJourney$stepsArgs<ExtArgs>
    _count?: boolean | LearningJourneyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearningJourneyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    personalizedForUser?: boolean | LearningJourney$personalizedForUserArgs<ExtArgs>
  }
  export type LearningJourneyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    personalizedForUser?: boolean | LearningJourney$personalizedForUserArgs<ExtArgs>
  }

  export type $LearningJourneyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningJourney"
    objects: {
      personalizedForUser: Prisma.$UserPayload<ExtArgs> | null
      steps: Prisma.$LearningJourneyStepPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string | null
      order: number | null
      title: string
      intro: string | null
      objectives: Prisma.JsonValue | null
      isStandard: boolean
      personalizedForUserId: string | null
      userGoalSummary: string | null
      goalChatId: string | null
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["learningJourney"]>
    composites: {}
  }

  type LearningJourneyGetPayload<S extends boolean | null | undefined | LearningJourneyDefaultArgs> = $Result.GetResult<Prisma.$LearningJourneyPayload, S>

  type LearningJourneyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningJourneyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningJourneyCountAggregateInputType | true
    }

  export interface LearningJourneyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningJourney'], meta: { name: 'LearningJourney' } }
    /**
     * Find zero or one LearningJourney that matches the filter.
     * @param {LearningJourneyFindUniqueArgs} args - Arguments to find a LearningJourney
     * @example
     * // Get one LearningJourney
     * const learningJourney = await prisma.learningJourney.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningJourneyFindUniqueArgs>(args: SelectSubset<T, LearningJourneyFindUniqueArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningJourney that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningJourneyFindUniqueOrThrowArgs} args - Arguments to find a LearningJourney
     * @example
     * // Get one LearningJourney
     * const learningJourney = await prisma.learningJourney.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningJourneyFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningJourneyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningJourney that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyFindFirstArgs} args - Arguments to find a LearningJourney
     * @example
     * // Get one LearningJourney
     * const learningJourney = await prisma.learningJourney.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningJourneyFindFirstArgs>(args?: SelectSubset<T, LearningJourneyFindFirstArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningJourney that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyFindFirstOrThrowArgs} args - Arguments to find a LearningJourney
     * @example
     * // Get one LearningJourney
     * const learningJourney = await prisma.learningJourney.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningJourneyFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningJourneyFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningJourneys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningJourneys
     * const learningJourneys = await prisma.learningJourney.findMany()
     * 
     * // Get first 10 LearningJourneys
     * const learningJourneys = await prisma.learningJourney.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningJourneyWithIdOnly = await prisma.learningJourney.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningJourneyFindManyArgs>(args?: SelectSubset<T, LearningJourneyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningJourney.
     * @param {LearningJourneyCreateArgs} args - Arguments to create a LearningJourney.
     * @example
     * // Create one LearningJourney
     * const LearningJourney = await prisma.learningJourney.create({
     *   data: {
     *     // ... data to create a LearningJourney
     *   }
     * })
     * 
     */
    create<T extends LearningJourneyCreateArgs>(args: SelectSubset<T, LearningJourneyCreateArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningJourneys.
     * @param {LearningJourneyCreateManyArgs} args - Arguments to create many LearningJourneys.
     * @example
     * // Create many LearningJourneys
     * const learningJourney = await prisma.learningJourney.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningJourneyCreateManyArgs>(args?: SelectSubset<T, LearningJourneyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningJourneys and returns the data saved in the database.
     * @param {LearningJourneyCreateManyAndReturnArgs} args - Arguments to create many LearningJourneys.
     * @example
     * // Create many LearningJourneys
     * const learningJourney = await prisma.learningJourney.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningJourneys and only return the `id`
     * const learningJourneyWithIdOnly = await prisma.learningJourney.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningJourneyCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningJourneyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningJourney.
     * @param {LearningJourneyDeleteArgs} args - Arguments to delete one LearningJourney.
     * @example
     * // Delete one LearningJourney
     * const LearningJourney = await prisma.learningJourney.delete({
     *   where: {
     *     // ... filter to delete one LearningJourney
     *   }
     * })
     * 
     */
    delete<T extends LearningJourneyDeleteArgs>(args: SelectSubset<T, LearningJourneyDeleteArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningJourney.
     * @param {LearningJourneyUpdateArgs} args - Arguments to update one LearningJourney.
     * @example
     * // Update one LearningJourney
     * const learningJourney = await prisma.learningJourney.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningJourneyUpdateArgs>(args: SelectSubset<T, LearningJourneyUpdateArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningJourneys.
     * @param {LearningJourneyDeleteManyArgs} args - Arguments to filter LearningJourneys to delete.
     * @example
     * // Delete a few LearningJourneys
     * const { count } = await prisma.learningJourney.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningJourneyDeleteManyArgs>(args?: SelectSubset<T, LearningJourneyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningJourneys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningJourneys
     * const learningJourney = await prisma.learningJourney.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningJourneyUpdateManyArgs>(args: SelectSubset<T, LearningJourneyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningJourneys and returns the data updated in the database.
     * @param {LearningJourneyUpdateManyAndReturnArgs} args - Arguments to update many LearningJourneys.
     * @example
     * // Update many LearningJourneys
     * const learningJourney = await prisma.learningJourney.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningJourneys and only return the `id`
     * const learningJourneyWithIdOnly = await prisma.learningJourney.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningJourneyUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningJourneyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningJourney.
     * @param {LearningJourneyUpsertArgs} args - Arguments to update or create a LearningJourney.
     * @example
     * // Update or create a LearningJourney
     * const learningJourney = await prisma.learningJourney.upsert({
     *   create: {
     *     // ... data to create a LearningJourney
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningJourney we want to update
     *   }
     * })
     */
    upsert<T extends LearningJourneyUpsertArgs>(args: SelectSubset<T, LearningJourneyUpsertArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningJourneys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyCountArgs} args - Arguments to filter LearningJourneys to count.
     * @example
     * // Count the number of LearningJourneys
     * const count = await prisma.learningJourney.count({
     *   where: {
     *     // ... the filter for the LearningJourneys we want to count
     *   }
     * })
    **/
    count<T extends LearningJourneyCountArgs>(
      args?: Subset<T, LearningJourneyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningJourneyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningJourney.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningJourneyAggregateArgs>(args: Subset<T, LearningJourneyAggregateArgs>): Prisma.PrismaPromise<GetLearningJourneyAggregateType<T>>

    /**
     * Group by LearningJourney.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningJourneyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningJourneyGroupByArgs['orderBy'] }
        : { orderBy?: LearningJourneyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningJourneyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningJourneyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningJourney model
   */
  readonly fields: LearningJourneyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningJourney.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningJourneyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    personalizedForUser<T extends LearningJourney$personalizedForUserArgs<ExtArgs> = {}>(args?: Subset<T, LearningJourney$personalizedForUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    steps<T extends LearningJourney$stepsArgs<ExtArgs> = {}>(args?: Subset<T, LearningJourney$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningJourney model
   */
  interface LearningJourneyFieldRefs {
    readonly id: FieldRef<"LearningJourney", 'String'>
    readonly slug: FieldRef<"LearningJourney", 'String'>
    readonly order: FieldRef<"LearningJourney", 'Int'>
    readonly title: FieldRef<"LearningJourney", 'String'>
    readonly intro: FieldRef<"LearningJourney", 'String'>
    readonly objectives: FieldRef<"LearningJourney", 'Json'>
    readonly isStandard: FieldRef<"LearningJourney", 'Boolean'>
    readonly personalizedForUserId: FieldRef<"LearningJourney", 'String'>
    readonly userGoalSummary: FieldRef<"LearningJourney", 'String'>
    readonly goalChatId: FieldRef<"LearningJourney", 'String'>
    readonly status: FieldRef<"LearningJourney", 'String'>
    readonly createdAt: FieldRef<"LearningJourney", 'DateTime'>
    readonly updatedAt: FieldRef<"LearningJourney", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningJourney findUnique
   */
  export type LearningJourneyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourney to fetch.
     */
    where: LearningJourneyWhereUniqueInput
  }

  /**
   * LearningJourney findUniqueOrThrow
   */
  export type LearningJourneyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourney to fetch.
     */
    where: LearningJourneyWhereUniqueInput
  }

  /**
   * LearningJourney findFirst
   */
  export type LearningJourneyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourney to fetch.
     */
    where?: LearningJourneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneys to fetch.
     */
    orderBy?: LearningJourneyOrderByWithRelationInput | LearningJourneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningJourneys.
     */
    cursor?: LearningJourneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningJourneys.
     */
    distinct?: LearningJourneyScalarFieldEnum | LearningJourneyScalarFieldEnum[]
  }

  /**
   * LearningJourney findFirstOrThrow
   */
  export type LearningJourneyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourney to fetch.
     */
    where?: LearningJourneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneys to fetch.
     */
    orderBy?: LearningJourneyOrderByWithRelationInput | LearningJourneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningJourneys.
     */
    cursor?: LearningJourneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningJourneys.
     */
    distinct?: LearningJourneyScalarFieldEnum | LearningJourneyScalarFieldEnum[]
  }

  /**
   * LearningJourney findMany
   */
  export type LearningJourneyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourneys to fetch.
     */
    where?: LearningJourneyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneys to fetch.
     */
    orderBy?: LearningJourneyOrderByWithRelationInput | LearningJourneyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningJourneys.
     */
    cursor?: LearningJourneyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneys.
     */
    skip?: number
    distinct?: LearningJourneyScalarFieldEnum | LearningJourneyScalarFieldEnum[]
  }

  /**
   * LearningJourney create
   */
  export type LearningJourneyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningJourney.
     */
    data: XOR<LearningJourneyCreateInput, LearningJourneyUncheckedCreateInput>
  }

  /**
   * LearningJourney createMany
   */
  export type LearningJourneyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningJourneys.
     */
    data: LearningJourneyCreateManyInput | LearningJourneyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningJourney createManyAndReturn
   */
  export type LearningJourneyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * The data used to create many LearningJourneys.
     */
    data: LearningJourneyCreateManyInput | LearningJourneyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningJourney update
   */
  export type LearningJourneyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningJourney.
     */
    data: XOR<LearningJourneyUpdateInput, LearningJourneyUncheckedUpdateInput>
    /**
     * Choose, which LearningJourney to update.
     */
    where: LearningJourneyWhereUniqueInput
  }

  /**
   * LearningJourney updateMany
   */
  export type LearningJourneyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningJourneys.
     */
    data: XOR<LearningJourneyUpdateManyMutationInput, LearningJourneyUncheckedUpdateManyInput>
    /**
     * Filter which LearningJourneys to update
     */
    where?: LearningJourneyWhereInput
    /**
     * Limit how many LearningJourneys to update.
     */
    limit?: number
  }

  /**
   * LearningJourney updateManyAndReturn
   */
  export type LearningJourneyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * The data used to update LearningJourneys.
     */
    data: XOR<LearningJourneyUpdateManyMutationInput, LearningJourneyUncheckedUpdateManyInput>
    /**
     * Filter which LearningJourneys to update
     */
    where?: LearningJourneyWhereInput
    /**
     * Limit how many LearningJourneys to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningJourney upsert
   */
  export type LearningJourneyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningJourney to update in case it exists.
     */
    where: LearningJourneyWhereUniqueInput
    /**
     * In case the LearningJourney found by the `where` argument doesn't exist, create a new LearningJourney with this data.
     */
    create: XOR<LearningJourneyCreateInput, LearningJourneyUncheckedCreateInput>
    /**
     * In case the LearningJourney was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningJourneyUpdateInput, LearningJourneyUncheckedUpdateInput>
  }

  /**
   * LearningJourney delete
   */
  export type LearningJourneyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
    /**
     * Filter which LearningJourney to delete.
     */
    where: LearningJourneyWhereUniqueInput
  }

  /**
   * LearningJourney deleteMany
   */
  export type LearningJourneyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningJourneys to delete
     */
    where?: LearningJourneyWhereInput
    /**
     * Limit how many LearningJourneys to delete.
     */
    limit?: number
  }

  /**
   * LearningJourney.personalizedForUser
   */
  export type LearningJourney$personalizedForUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * LearningJourney.steps
   */
  export type LearningJourney$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    where?: LearningJourneyStepWhereInput
    orderBy?: LearningJourneyStepOrderByWithRelationInput | LearningJourneyStepOrderByWithRelationInput[]
    cursor?: LearningJourneyStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningJourneyStepScalarFieldEnum | LearningJourneyStepScalarFieldEnum[]
  }

  /**
   * LearningJourney without action
   */
  export type LearningJourneyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourney
     */
    select?: LearningJourneySelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourney
     */
    omit?: LearningJourneyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyInclude<ExtArgs> | null
  }


  /**
   * Model LearningSessionOutline
   */

  export type AggregateLearningSessionOutline = {
    _count: LearningSessionOutlineCountAggregateOutputType | null
    _avg: LearningSessionOutlineAvgAggregateOutputType | null
    _sum: LearningSessionOutlineSumAggregateOutputType | null
    _min: LearningSessionOutlineMinAggregateOutputType | null
    _max: LearningSessionOutlineMaxAggregateOutputType | null
  }

  export type LearningSessionOutlineAvgAggregateOutputType = {
    order: number | null
  }

  export type LearningSessionOutlineSumAggregateOutputType = {
    order: number | null
  }

  export type LearningSessionOutlineMinAggregateOutputType = {
    id: string | null
    slug: string | null
    order: number | null
    title: string | null
    objective: string | null
    content: string | null
    botTools: string | null
    firstUserMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningSessionOutlineMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    order: number | null
    title: string | null
    objective: string | null
    content: string | null
    botTools: string | null
    firstUserMessage: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningSessionOutlineCountAggregateOutputType = {
    id: number
    slug: number
    order: number
    title: number
    objective: number
    content: number
    botTools: number
    firstUserMessage: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LearningSessionOutlineAvgAggregateInputType = {
    order?: true
  }

  export type LearningSessionOutlineSumAggregateInputType = {
    order?: true
  }

  export type LearningSessionOutlineMinAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    title?: true
    objective?: true
    content?: true
    botTools?: true
    firstUserMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningSessionOutlineMaxAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    title?: true
    objective?: true
    content?: true
    botTools?: true
    firstUserMessage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningSessionOutlineCountAggregateInputType = {
    id?: true
    slug?: true
    order?: true
    title?: true
    objective?: true
    content?: true
    botTools?: true
    firstUserMessage?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LearningSessionOutlineAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningSessionOutline to aggregate.
     */
    where?: LearningSessionOutlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionOutlines to fetch.
     */
    orderBy?: LearningSessionOutlineOrderByWithRelationInput | LearningSessionOutlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningSessionOutlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionOutlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionOutlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningSessionOutlines
    **/
    _count?: true | LearningSessionOutlineCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningSessionOutlineAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningSessionOutlineSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningSessionOutlineMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningSessionOutlineMaxAggregateInputType
  }

  export type GetLearningSessionOutlineAggregateType<T extends LearningSessionOutlineAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningSessionOutline]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningSessionOutline[P]>
      : GetScalarType<T[P], AggregateLearningSessionOutline[P]>
  }




  export type LearningSessionOutlineGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningSessionOutlineWhereInput
    orderBy?: LearningSessionOutlineOrderByWithAggregationInput | LearningSessionOutlineOrderByWithAggregationInput[]
    by: LearningSessionOutlineScalarFieldEnum[] | LearningSessionOutlineScalarFieldEnum
    having?: LearningSessionOutlineScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningSessionOutlineCountAggregateInputType | true
    _avg?: LearningSessionOutlineAvgAggregateInputType
    _sum?: LearningSessionOutlineSumAggregateInputType
    _min?: LearningSessionOutlineMinAggregateInputType
    _max?: LearningSessionOutlineMaxAggregateInputType
  }

  export type LearningSessionOutlineGroupByOutputType = {
    id: string
    slug: string
    order: number
    title: string
    objective: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: LearningSessionOutlineCountAggregateOutputType | null
    _avg: LearningSessionOutlineAvgAggregateOutputType | null
    _sum: LearningSessionOutlineSumAggregateOutputType | null
    _min: LearningSessionOutlineMinAggregateOutputType | null
    _max: LearningSessionOutlineMaxAggregateOutputType | null
  }

  type GetLearningSessionOutlineGroupByPayload<T extends LearningSessionOutlineGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningSessionOutlineGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningSessionOutlineGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningSessionOutlineGroupByOutputType[P]>
            : GetScalarType<T[P], LearningSessionOutlineGroupByOutputType[P]>
        }
      >
    >


  export type LearningSessionOutlineSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    objective?: boolean
    content?: boolean
    botTools?: boolean
    firstUserMessage?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    steps?: boolean | LearningSessionOutline$stepsArgs<ExtArgs>
    learningSessionChats?: boolean | LearningSessionOutline$learningSessionChatsArgs<ExtArgs>
    _count?: boolean | LearningSessionOutlineCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningSessionOutline"]>

  export type LearningSessionOutlineSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    objective?: boolean
    content?: boolean
    botTools?: boolean
    firstUserMessage?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["learningSessionOutline"]>

  export type LearningSessionOutlineSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    objective?: boolean
    content?: boolean
    botTools?: boolean
    firstUserMessage?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["learningSessionOutline"]>

  export type LearningSessionOutlineSelectScalar = {
    id?: boolean
    slug?: boolean
    order?: boolean
    title?: boolean
    objective?: boolean
    content?: boolean
    botTools?: boolean
    firstUserMessage?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LearningSessionOutlineOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "order" | "title" | "objective" | "content" | "botTools" | "firstUserMessage" | "tags" | "createdAt" | "updatedAt", ExtArgs["result"]["learningSessionOutline"]>
  export type LearningSessionOutlineInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    steps?: boolean | LearningSessionOutline$stepsArgs<ExtArgs>
    learningSessionChats?: boolean | LearningSessionOutline$learningSessionChatsArgs<ExtArgs>
    _count?: boolean | LearningSessionOutlineCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearningSessionOutlineIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LearningSessionOutlineIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LearningSessionOutlinePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningSessionOutline"
    objects: {
      steps: Prisma.$LearningJourneyStepPayload<ExtArgs>[]
      learningSessionChats: Prisma.$LearningSessionChatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      order: number
      title: string
      objective: string | null
      content: string
      botTools: string
      firstUserMessage: string
      tags: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["learningSessionOutline"]>
    composites: {}
  }

  type LearningSessionOutlineGetPayload<S extends boolean | null | undefined | LearningSessionOutlineDefaultArgs> = $Result.GetResult<Prisma.$LearningSessionOutlinePayload, S>

  type LearningSessionOutlineCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningSessionOutlineFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningSessionOutlineCountAggregateInputType | true
    }

  export interface LearningSessionOutlineDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningSessionOutline'], meta: { name: 'LearningSessionOutline' } }
    /**
     * Find zero or one LearningSessionOutline that matches the filter.
     * @param {LearningSessionOutlineFindUniqueArgs} args - Arguments to find a LearningSessionOutline
     * @example
     * // Get one LearningSessionOutline
     * const learningSessionOutline = await prisma.learningSessionOutline.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningSessionOutlineFindUniqueArgs>(args: SelectSubset<T, LearningSessionOutlineFindUniqueArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningSessionOutline that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningSessionOutlineFindUniqueOrThrowArgs} args - Arguments to find a LearningSessionOutline
     * @example
     * // Get one LearningSessionOutline
     * const learningSessionOutline = await prisma.learningSessionOutline.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningSessionOutlineFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningSessionOutlineFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningSessionOutline that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionOutlineFindFirstArgs} args - Arguments to find a LearningSessionOutline
     * @example
     * // Get one LearningSessionOutline
     * const learningSessionOutline = await prisma.learningSessionOutline.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningSessionOutlineFindFirstArgs>(args?: SelectSubset<T, LearningSessionOutlineFindFirstArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningSessionOutline that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionOutlineFindFirstOrThrowArgs} args - Arguments to find a LearningSessionOutline
     * @example
     * // Get one LearningSessionOutline
     * const learningSessionOutline = await prisma.learningSessionOutline.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningSessionOutlineFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningSessionOutlineFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningSessionOutlines that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionOutlineFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningSessionOutlines
     * const learningSessionOutlines = await prisma.learningSessionOutline.findMany()
     * 
     * // Get first 10 LearningSessionOutlines
     * const learningSessionOutlines = await prisma.learningSessionOutline.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningSessionOutlineWithIdOnly = await prisma.learningSessionOutline.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningSessionOutlineFindManyArgs>(args?: SelectSubset<T, LearningSessionOutlineFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningSessionOutline.
     * @param {LearningSessionOutlineCreateArgs} args - Arguments to create a LearningSessionOutline.
     * @example
     * // Create one LearningSessionOutline
     * const LearningSessionOutline = await prisma.learningSessionOutline.create({
     *   data: {
     *     // ... data to create a LearningSessionOutline
     *   }
     * })
     * 
     */
    create<T extends LearningSessionOutlineCreateArgs>(args: SelectSubset<T, LearningSessionOutlineCreateArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningSessionOutlines.
     * @param {LearningSessionOutlineCreateManyArgs} args - Arguments to create many LearningSessionOutlines.
     * @example
     * // Create many LearningSessionOutlines
     * const learningSessionOutline = await prisma.learningSessionOutline.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningSessionOutlineCreateManyArgs>(args?: SelectSubset<T, LearningSessionOutlineCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningSessionOutlines and returns the data saved in the database.
     * @param {LearningSessionOutlineCreateManyAndReturnArgs} args - Arguments to create many LearningSessionOutlines.
     * @example
     * // Create many LearningSessionOutlines
     * const learningSessionOutline = await prisma.learningSessionOutline.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningSessionOutlines and only return the `id`
     * const learningSessionOutlineWithIdOnly = await prisma.learningSessionOutline.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningSessionOutlineCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningSessionOutlineCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningSessionOutline.
     * @param {LearningSessionOutlineDeleteArgs} args - Arguments to delete one LearningSessionOutline.
     * @example
     * // Delete one LearningSessionOutline
     * const LearningSessionOutline = await prisma.learningSessionOutline.delete({
     *   where: {
     *     // ... filter to delete one LearningSessionOutline
     *   }
     * })
     * 
     */
    delete<T extends LearningSessionOutlineDeleteArgs>(args: SelectSubset<T, LearningSessionOutlineDeleteArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningSessionOutline.
     * @param {LearningSessionOutlineUpdateArgs} args - Arguments to update one LearningSessionOutline.
     * @example
     * // Update one LearningSessionOutline
     * const learningSessionOutline = await prisma.learningSessionOutline.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningSessionOutlineUpdateArgs>(args: SelectSubset<T, LearningSessionOutlineUpdateArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningSessionOutlines.
     * @param {LearningSessionOutlineDeleteManyArgs} args - Arguments to filter LearningSessionOutlines to delete.
     * @example
     * // Delete a few LearningSessionOutlines
     * const { count } = await prisma.learningSessionOutline.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningSessionOutlineDeleteManyArgs>(args?: SelectSubset<T, LearningSessionOutlineDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningSessionOutlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionOutlineUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningSessionOutlines
     * const learningSessionOutline = await prisma.learningSessionOutline.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningSessionOutlineUpdateManyArgs>(args: SelectSubset<T, LearningSessionOutlineUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningSessionOutlines and returns the data updated in the database.
     * @param {LearningSessionOutlineUpdateManyAndReturnArgs} args - Arguments to update many LearningSessionOutlines.
     * @example
     * // Update many LearningSessionOutlines
     * const learningSessionOutline = await prisma.learningSessionOutline.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningSessionOutlines and only return the `id`
     * const learningSessionOutlineWithIdOnly = await prisma.learningSessionOutline.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningSessionOutlineUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningSessionOutlineUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningSessionOutline.
     * @param {LearningSessionOutlineUpsertArgs} args - Arguments to update or create a LearningSessionOutline.
     * @example
     * // Update or create a LearningSessionOutline
     * const learningSessionOutline = await prisma.learningSessionOutline.upsert({
     *   create: {
     *     // ... data to create a LearningSessionOutline
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningSessionOutline we want to update
     *   }
     * })
     */
    upsert<T extends LearningSessionOutlineUpsertArgs>(args: SelectSubset<T, LearningSessionOutlineUpsertArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningSessionOutlines.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionOutlineCountArgs} args - Arguments to filter LearningSessionOutlines to count.
     * @example
     * // Count the number of LearningSessionOutlines
     * const count = await prisma.learningSessionOutline.count({
     *   where: {
     *     // ... the filter for the LearningSessionOutlines we want to count
     *   }
     * })
    **/
    count<T extends LearningSessionOutlineCountArgs>(
      args?: Subset<T, LearningSessionOutlineCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningSessionOutlineCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningSessionOutline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionOutlineAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningSessionOutlineAggregateArgs>(args: Subset<T, LearningSessionOutlineAggregateArgs>): Prisma.PrismaPromise<GetLearningSessionOutlineAggregateType<T>>

    /**
     * Group by LearningSessionOutline.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningSessionOutlineGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningSessionOutlineGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningSessionOutlineGroupByArgs['orderBy'] }
        : { orderBy?: LearningSessionOutlineGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningSessionOutlineGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningSessionOutlineGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningSessionOutline model
   */
  readonly fields: LearningSessionOutlineFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningSessionOutline.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningSessionOutlineClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    steps<T extends LearningSessionOutline$stepsArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionOutline$stepsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    learningSessionChats<T extends LearningSessionOutline$learningSessionChatsArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionOutline$learningSessionChatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningSessionOutline model
   */
  interface LearningSessionOutlineFieldRefs {
    readonly id: FieldRef<"LearningSessionOutline", 'String'>
    readonly slug: FieldRef<"LearningSessionOutline", 'String'>
    readonly order: FieldRef<"LearningSessionOutline", 'Int'>
    readonly title: FieldRef<"LearningSessionOutline", 'String'>
    readonly objective: FieldRef<"LearningSessionOutline", 'String'>
    readonly content: FieldRef<"LearningSessionOutline", 'String'>
    readonly botTools: FieldRef<"LearningSessionOutline", 'String'>
    readonly firstUserMessage: FieldRef<"LearningSessionOutline", 'String'>
    readonly tags: FieldRef<"LearningSessionOutline", 'Json'>
    readonly createdAt: FieldRef<"LearningSessionOutline", 'DateTime'>
    readonly updatedAt: FieldRef<"LearningSessionOutline", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningSessionOutline findUnique
   */
  export type LearningSessionOutlineFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionOutline to fetch.
     */
    where: LearningSessionOutlineWhereUniqueInput
  }

  /**
   * LearningSessionOutline findUniqueOrThrow
   */
  export type LearningSessionOutlineFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionOutline to fetch.
     */
    where: LearningSessionOutlineWhereUniqueInput
  }

  /**
   * LearningSessionOutline findFirst
   */
  export type LearningSessionOutlineFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionOutline to fetch.
     */
    where?: LearningSessionOutlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionOutlines to fetch.
     */
    orderBy?: LearningSessionOutlineOrderByWithRelationInput | LearningSessionOutlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningSessionOutlines.
     */
    cursor?: LearningSessionOutlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionOutlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionOutlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningSessionOutlines.
     */
    distinct?: LearningSessionOutlineScalarFieldEnum | LearningSessionOutlineScalarFieldEnum[]
  }

  /**
   * LearningSessionOutline findFirstOrThrow
   */
  export type LearningSessionOutlineFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionOutline to fetch.
     */
    where?: LearningSessionOutlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionOutlines to fetch.
     */
    orderBy?: LearningSessionOutlineOrderByWithRelationInput | LearningSessionOutlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningSessionOutlines.
     */
    cursor?: LearningSessionOutlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionOutlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionOutlines.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningSessionOutlines.
     */
    distinct?: LearningSessionOutlineScalarFieldEnum | LearningSessionOutlineScalarFieldEnum[]
  }

  /**
   * LearningSessionOutline findMany
   */
  export type LearningSessionOutlineFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * Filter, which LearningSessionOutlines to fetch.
     */
    where?: LearningSessionOutlineWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningSessionOutlines to fetch.
     */
    orderBy?: LearningSessionOutlineOrderByWithRelationInput | LearningSessionOutlineOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningSessionOutlines.
     */
    cursor?: LearningSessionOutlineWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningSessionOutlines from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningSessionOutlines.
     */
    skip?: number
    distinct?: LearningSessionOutlineScalarFieldEnum | LearningSessionOutlineScalarFieldEnum[]
  }

  /**
   * LearningSessionOutline create
   */
  export type LearningSessionOutlineCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningSessionOutline.
     */
    data: XOR<LearningSessionOutlineCreateInput, LearningSessionOutlineUncheckedCreateInput>
  }

  /**
   * LearningSessionOutline createMany
   */
  export type LearningSessionOutlineCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningSessionOutlines.
     */
    data: LearningSessionOutlineCreateManyInput | LearningSessionOutlineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningSessionOutline createManyAndReturn
   */
  export type LearningSessionOutlineCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * The data used to create many LearningSessionOutlines.
     */
    data: LearningSessionOutlineCreateManyInput | LearningSessionOutlineCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningSessionOutline update
   */
  export type LearningSessionOutlineUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningSessionOutline.
     */
    data: XOR<LearningSessionOutlineUpdateInput, LearningSessionOutlineUncheckedUpdateInput>
    /**
     * Choose, which LearningSessionOutline to update.
     */
    where: LearningSessionOutlineWhereUniqueInput
  }

  /**
   * LearningSessionOutline updateMany
   */
  export type LearningSessionOutlineUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningSessionOutlines.
     */
    data: XOR<LearningSessionOutlineUpdateManyMutationInput, LearningSessionOutlineUncheckedUpdateManyInput>
    /**
     * Filter which LearningSessionOutlines to update
     */
    where?: LearningSessionOutlineWhereInput
    /**
     * Limit how many LearningSessionOutlines to update.
     */
    limit?: number
  }

  /**
   * LearningSessionOutline updateManyAndReturn
   */
  export type LearningSessionOutlineUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * The data used to update LearningSessionOutlines.
     */
    data: XOR<LearningSessionOutlineUpdateManyMutationInput, LearningSessionOutlineUncheckedUpdateManyInput>
    /**
     * Filter which LearningSessionOutlines to update
     */
    where?: LearningSessionOutlineWhereInput
    /**
     * Limit how many LearningSessionOutlines to update.
     */
    limit?: number
  }

  /**
   * LearningSessionOutline upsert
   */
  export type LearningSessionOutlineUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningSessionOutline to update in case it exists.
     */
    where: LearningSessionOutlineWhereUniqueInput
    /**
     * In case the LearningSessionOutline found by the `where` argument doesn't exist, create a new LearningSessionOutline with this data.
     */
    create: XOR<LearningSessionOutlineCreateInput, LearningSessionOutlineUncheckedCreateInput>
    /**
     * In case the LearningSessionOutline was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningSessionOutlineUpdateInput, LearningSessionOutlineUncheckedUpdateInput>
  }

  /**
   * LearningSessionOutline delete
   */
  export type LearningSessionOutlineDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
    /**
     * Filter which LearningSessionOutline to delete.
     */
    where: LearningSessionOutlineWhereUniqueInput
  }

  /**
   * LearningSessionOutline deleteMany
   */
  export type LearningSessionOutlineDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningSessionOutlines to delete
     */
    where?: LearningSessionOutlineWhereInput
    /**
     * Limit how many LearningSessionOutlines to delete.
     */
    limit?: number
  }

  /**
   * LearningSessionOutline.steps
   */
  export type LearningSessionOutline$stepsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    where?: LearningJourneyStepWhereInput
    orderBy?: LearningJourneyStepOrderByWithRelationInput | LearningJourneyStepOrderByWithRelationInput[]
    cursor?: LearningJourneyStepWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningJourneyStepScalarFieldEnum | LearningJourneyStepScalarFieldEnum[]
  }

  /**
   * LearningSessionOutline.learningSessionChats
   */
  export type LearningSessionOutline$learningSessionChatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    where?: LearningSessionChatWhereInput
    orderBy?: LearningSessionChatOrderByWithRelationInput | LearningSessionChatOrderByWithRelationInput[]
    cursor?: LearningSessionChatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningSessionChatScalarFieldEnum | LearningSessionChatScalarFieldEnum[]
  }

  /**
   * LearningSessionOutline without action
   */
  export type LearningSessionOutlineDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionOutline
     */
    select?: LearningSessionOutlineSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionOutline
     */
    omit?: LearningSessionOutlineOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionOutlineInclude<ExtArgs> | null
  }


  /**
   * Model LearningJourneyStep
   */

  export type AggregateLearningJourneyStep = {
    _count: LearningJourneyStepCountAggregateOutputType | null
    _avg: LearningJourneyStepAvgAggregateOutputType | null
    _sum: LearningJourneyStepSumAggregateOutputType | null
    _min: LearningJourneyStepMinAggregateOutputType | null
    _max: LearningJourneyStepMaxAggregateOutputType | null
  }

  export type LearningJourneyStepAvgAggregateOutputType = {
    order: number | null
  }

  export type LearningJourneyStepSumAggregateOutputType = {
    order: number | null
  }

  export type LearningJourneyStepMinAggregateOutputType = {
    id: string | null
    journeyId: string | null
    sessionOutlineId: string | null
    order: number | null
    status: string | null
    ahaText: string | null
    unlockedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningJourneyStepMaxAggregateOutputType = {
    id: string | null
    journeyId: string | null
    sessionOutlineId: string | null
    order: number | null
    status: string | null
    ahaText: string | null
    unlockedAt: Date | null
    completedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type LearningJourneyStepCountAggregateOutputType = {
    id: number
    journeyId: number
    sessionOutlineId: number
    order: number
    status: number
    ahaText: number
    unlockedAt: number
    completedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type LearningJourneyStepAvgAggregateInputType = {
    order?: true
  }

  export type LearningJourneyStepSumAggregateInputType = {
    order?: true
  }

  export type LearningJourneyStepMinAggregateInputType = {
    id?: true
    journeyId?: true
    sessionOutlineId?: true
    order?: true
    status?: true
    ahaText?: true
    unlockedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningJourneyStepMaxAggregateInputType = {
    id?: true
    journeyId?: true
    sessionOutlineId?: true
    order?: true
    status?: true
    ahaText?: true
    unlockedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type LearningJourneyStepCountAggregateInputType = {
    id?: true
    journeyId?: true
    sessionOutlineId?: true
    order?: true
    status?: true
    ahaText?: true
    unlockedAt?: true
    completedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type LearningJourneyStepAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningJourneyStep to aggregate.
     */
    where?: LearningJourneyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneySteps to fetch.
     */
    orderBy?: LearningJourneyStepOrderByWithRelationInput | LearningJourneyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LearningJourneyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneySteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LearningJourneySteps
    **/
    _count?: true | LearningJourneyStepCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LearningJourneyStepAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LearningJourneyStepSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LearningJourneyStepMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LearningJourneyStepMaxAggregateInputType
  }

  export type GetLearningJourneyStepAggregateType<T extends LearningJourneyStepAggregateArgs> = {
        [P in keyof T & keyof AggregateLearningJourneyStep]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLearningJourneyStep[P]>
      : GetScalarType<T[P], AggregateLearningJourneyStep[P]>
  }




  export type LearningJourneyStepGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LearningJourneyStepWhereInput
    orderBy?: LearningJourneyStepOrderByWithAggregationInput | LearningJourneyStepOrderByWithAggregationInput[]
    by: LearningJourneyStepScalarFieldEnum[] | LearningJourneyStepScalarFieldEnum
    having?: LearningJourneyStepScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LearningJourneyStepCountAggregateInputType | true
    _avg?: LearningJourneyStepAvgAggregateInputType
    _sum?: LearningJourneyStepSumAggregateInputType
    _min?: LearningJourneyStepMinAggregateInputType
    _max?: LearningJourneyStepMaxAggregateInputType
  }

  export type LearningJourneyStepGroupByOutputType = {
    id: string
    journeyId: string
    sessionOutlineId: string
    order: number
    status: string
    ahaText: string | null
    unlockedAt: Date | null
    completedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: LearningJourneyStepCountAggregateOutputType | null
    _avg: LearningJourneyStepAvgAggregateOutputType | null
    _sum: LearningJourneyStepSumAggregateOutputType | null
    _min: LearningJourneyStepMinAggregateOutputType | null
    _max: LearningJourneyStepMaxAggregateOutputType | null
  }

  type GetLearningJourneyStepGroupByPayload<T extends LearningJourneyStepGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LearningJourneyStepGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LearningJourneyStepGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LearningJourneyStepGroupByOutputType[P]>
            : GetScalarType<T[P], LearningJourneyStepGroupByOutputType[P]>
        }
      >
    >


  export type LearningJourneyStepSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    journeyId?: boolean
    sessionOutlineId?: boolean
    order?: boolean
    status?: boolean
    ahaText?: boolean
    unlockedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journey?: boolean | LearningJourneyDefaultArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionOutlineDefaultArgs<ExtArgs>
    chats?: boolean | LearningJourneyStep$chatsArgs<ExtArgs>
    _count?: boolean | LearningJourneyStepCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningJourneyStep"]>

  export type LearningJourneyStepSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    journeyId?: boolean
    sessionOutlineId?: boolean
    order?: boolean
    status?: boolean
    ahaText?: boolean
    unlockedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journey?: boolean | LearningJourneyDefaultArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionOutlineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningJourneyStep"]>

  export type LearningJourneyStepSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    journeyId?: boolean
    sessionOutlineId?: boolean
    order?: boolean
    status?: boolean
    ahaText?: boolean
    unlockedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    journey?: boolean | LearningJourneyDefaultArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionOutlineDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["learningJourneyStep"]>

  export type LearningJourneyStepSelectScalar = {
    id?: boolean
    journeyId?: boolean
    sessionOutlineId?: boolean
    order?: boolean
    status?: boolean
    ahaText?: boolean
    unlockedAt?: boolean
    completedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type LearningJourneyStepOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "journeyId" | "sessionOutlineId" | "order" | "status" | "ahaText" | "unlockedAt" | "completedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["learningJourneyStep"]>
  export type LearningJourneyStepInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    journey?: boolean | LearningJourneyDefaultArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionOutlineDefaultArgs<ExtArgs>
    chats?: boolean | LearningJourneyStep$chatsArgs<ExtArgs>
    _count?: boolean | LearningJourneyStepCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LearningJourneyStepIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    journey?: boolean | LearningJourneyDefaultArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionOutlineDefaultArgs<ExtArgs>
  }
  export type LearningJourneyStepIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    journey?: boolean | LearningJourneyDefaultArgs<ExtArgs>
    sessionOutline?: boolean | LearningSessionOutlineDefaultArgs<ExtArgs>
  }

  export type $LearningJourneyStepPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LearningJourneyStep"
    objects: {
      journey: Prisma.$LearningJourneyPayload<ExtArgs>
      sessionOutline: Prisma.$LearningSessionOutlinePayload<ExtArgs>
      chats: Prisma.$LearningSessionChatPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      journeyId: string
      sessionOutlineId: string
      order: number
      status: string
      ahaText: string | null
      unlockedAt: Date | null
      completedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["learningJourneyStep"]>
    composites: {}
  }

  type LearningJourneyStepGetPayload<S extends boolean | null | undefined | LearningJourneyStepDefaultArgs> = $Result.GetResult<Prisma.$LearningJourneyStepPayload, S>

  type LearningJourneyStepCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LearningJourneyStepFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LearningJourneyStepCountAggregateInputType | true
    }

  export interface LearningJourneyStepDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LearningJourneyStep'], meta: { name: 'LearningJourneyStep' } }
    /**
     * Find zero or one LearningJourneyStep that matches the filter.
     * @param {LearningJourneyStepFindUniqueArgs} args - Arguments to find a LearningJourneyStep
     * @example
     * // Get one LearningJourneyStep
     * const learningJourneyStep = await prisma.learningJourneyStep.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LearningJourneyStepFindUniqueArgs>(args: SelectSubset<T, LearningJourneyStepFindUniqueArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LearningJourneyStep that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LearningJourneyStepFindUniqueOrThrowArgs} args - Arguments to find a LearningJourneyStep
     * @example
     * // Get one LearningJourneyStep
     * const learningJourneyStep = await prisma.learningJourneyStep.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LearningJourneyStepFindUniqueOrThrowArgs>(args: SelectSubset<T, LearningJourneyStepFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningJourneyStep that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyStepFindFirstArgs} args - Arguments to find a LearningJourneyStep
     * @example
     * // Get one LearningJourneyStep
     * const learningJourneyStep = await prisma.learningJourneyStep.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LearningJourneyStepFindFirstArgs>(args?: SelectSubset<T, LearningJourneyStepFindFirstArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LearningJourneyStep that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyStepFindFirstOrThrowArgs} args - Arguments to find a LearningJourneyStep
     * @example
     * // Get one LearningJourneyStep
     * const learningJourneyStep = await prisma.learningJourneyStep.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LearningJourneyStepFindFirstOrThrowArgs>(args?: SelectSubset<T, LearningJourneyStepFindFirstOrThrowArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LearningJourneySteps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyStepFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LearningJourneySteps
     * const learningJourneySteps = await prisma.learningJourneyStep.findMany()
     * 
     * // Get first 10 LearningJourneySteps
     * const learningJourneySteps = await prisma.learningJourneyStep.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const learningJourneyStepWithIdOnly = await prisma.learningJourneyStep.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LearningJourneyStepFindManyArgs>(args?: SelectSubset<T, LearningJourneyStepFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LearningJourneyStep.
     * @param {LearningJourneyStepCreateArgs} args - Arguments to create a LearningJourneyStep.
     * @example
     * // Create one LearningJourneyStep
     * const LearningJourneyStep = await prisma.learningJourneyStep.create({
     *   data: {
     *     // ... data to create a LearningJourneyStep
     *   }
     * })
     * 
     */
    create<T extends LearningJourneyStepCreateArgs>(args: SelectSubset<T, LearningJourneyStepCreateArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LearningJourneySteps.
     * @param {LearningJourneyStepCreateManyArgs} args - Arguments to create many LearningJourneySteps.
     * @example
     * // Create many LearningJourneySteps
     * const learningJourneyStep = await prisma.learningJourneyStep.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LearningJourneyStepCreateManyArgs>(args?: SelectSubset<T, LearningJourneyStepCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LearningJourneySteps and returns the data saved in the database.
     * @param {LearningJourneyStepCreateManyAndReturnArgs} args - Arguments to create many LearningJourneySteps.
     * @example
     * // Create many LearningJourneySteps
     * const learningJourneyStep = await prisma.learningJourneyStep.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LearningJourneySteps and only return the `id`
     * const learningJourneyStepWithIdOnly = await prisma.learningJourneyStep.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LearningJourneyStepCreateManyAndReturnArgs>(args?: SelectSubset<T, LearningJourneyStepCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LearningJourneyStep.
     * @param {LearningJourneyStepDeleteArgs} args - Arguments to delete one LearningJourneyStep.
     * @example
     * // Delete one LearningJourneyStep
     * const LearningJourneyStep = await prisma.learningJourneyStep.delete({
     *   where: {
     *     // ... filter to delete one LearningJourneyStep
     *   }
     * })
     * 
     */
    delete<T extends LearningJourneyStepDeleteArgs>(args: SelectSubset<T, LearningJourneyStepDeleteArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LearningJourneyStep.
     * @param {LearningJourneyStepUpdateArgs} args - Arguments to update one LearningJourneyStep.
     * @example
     * // Update one LearningJourneyStep
     * const learningJourneyStep = await prisma.learningJourneyStep.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LearningJourneyStepUpdateArgs>(args: SelectSubset<T, LearningJourneyStepUpdateArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LearningJourneySteps.
     * @param {LearningJourneyStepDeleteManyArgs} args - Arguments to filter LearningJourneySteps to delete.
     * @example
     * // Delete a few LearningJourneySteps
     * const { count } = await prisma.learningJourneyStep.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LearningJourneyStepDeleteManyArgs>(args?: SelectSubset<T, LearningJourneyStepDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningJourneySteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyStepUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LearningJourneySteps
     * const learningJourneyStep = await prisma.learningJourneyStep.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LearningJourneyStepUpdateManyArgs>(args: SelectSubset<T, LearningJourneyStepUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LearningJourneySteps and returns the data updated in the database.
     * @param {LearningJourneyStepUpdateManyAndReturnArgs} args - Arguments to update many LearningJourneySteps.
     * @example
     * // Update many LearningJourneySteps
     * const learningJourneyStep = await prisma.learningJourneyStep.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LearningJourneySteps and only return the `id`
     * const learningJourneyStepWithIdOnly = await prisma.learningJourneyStep.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LearningJourneyStepUpdateManyAndReturnArgs>(args: SelectSubset<T, LearningJourneyStepUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LearningJourneyStep.
     * @param {LearningJourneyStepUpsertArgs} args - Arguments to update or create a LearningJourneyStep.
     * @example
     * // Update or create a LearningJourneyStep
     * const learningJourneyStep = await prisma.learningJourneyStep.upsert({
     *   create: {
     *     // ... data to create a LearningJourneyStep
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LearningJourneyStep we want to update
     *   }
     * })
     */
    upsert<T extends LearningJourneyStepUpsertArgs>(args: SelectSubset<T, LearningJourneyStepUpsertArgs<ExtArgs>>): Prisma__LearningJourneyStepClient<$Result.GetResult<Prisma.$LearningJourneyStepPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LearningJourneySteps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyStepCountArgs} args - Arguments to filter LearningJourneySteps to count.
     * @example
     * // Count the number of LearningJourneySteps
     * const count = await prisma.learningJourneyStep.count({
     *   where: {
     *     // ... the filter for the LearningJourneySteps we want to count
     *   }
     * })
    **/
    count<T extends LearningJourneyStepCountArgs>(
      args?: Subset<T, LearningJourneyStepCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LearningJourneyStepCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LearningJourneyStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyStepAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LearningJourneyStepAggregateArgs>(args: Subset<T, LearningJourneyStepAggregateArgs>): Prisma.PrismaPromise<GetLearningJourneyStepAggregateType<T>>

    /**
     * Group by LearningJourneyStep.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LearningJourneyStepGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LearningJourneyStepGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LearningJourneyStepGroupByArgs['orderBy'] }
        : { orderBy?: LearningJourneyStepGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LearningJourneyStepGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLearningJourneyStepGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LearningJourneyStep model
   */
  readonly fields: LearningJourneyStepFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LearningJourneyStep.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LearningJourneyStepClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    journey<T extends LearningJourneyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningJourneyDefaultArgs<ExtArgs>>): Prisma__LearningJourneyClient<$Result.GetResult<Prisma.$LearningJourneyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    sessionOutline<T extends LearningSessionOutlineDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LearningSessionOutlineDefaultArgs<ExtArgs>>): Prisma__LearningSessionOutlineClient<$Result.GetResult<Prisma.$LearningSessionOutlinePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    chats<T extends LearningJourneyStep$chatsArgs<ExtArgs> = {}>(args?: Subset<T, LearningJourneyStep$chatsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LearningSessionChatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LearningJourneyStep model
   */
  interface LearningJourneyStepFieldRefs {
    readonly id: FieldRef<"LearningJourneyStep", 'String'>
    readonly journeyId: FieldRef<"LearningJourneyStep", 'String'>
    readonly sessionOutlineId: FieldRef<"LearningJourneyStep", 'String'>
    readonly order: FieldRef<"LearningJourneyStep", 'Int'>
    readonly status: FieldRef<"LearningJourneyStep", 'String'>
    readonly ahaText: FieldRef<"LearningJourneyStep", 'String'>
    readonly unlockedAt: FieldRef<"LearningJourneyStep", 'DateTime'>
    readonly completedAt: FieldRef<"LearningJourneyStep", 'DateTime'>
    readonly createdAt: FieldRef<"LearningJourneyStep", 'DateTime'>
    readonly updatedAt: FieldRef<"LearningJourneyStep", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LearningJourneyStep findUnique
   */
  export type LearningJourneyStepFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourneyStep to fetch.
     */
    where: LearningJourneyStepWhereUniqueInput
  }

  /**
   * LearningJourneyStep findUniqueOrThrow
   */
  export type LearningJourneyStepFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourneyStep to fetch.
     */
    where: LearningJourneyStepWhereUniqueInput
  }

  /**
   * LearningJourneyStep findFirst
   */
  export type LearningJourneyStepFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourneyStep to fetch.
     */
    where?: LearningJourneyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneySteps to fetch.
     */
    orderBy?: LearningJourneyStepOrderByWithRelationInput | LearningJourneyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningJourneySteps.
     */
    cursor?: LearningJourneyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneySteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningJourneySteps.
     */
    distinct?: LearningJourneyStepScalarFieldEnum | LearningJourneyStepScalarFieldEnum[]
  }

  /**
   * LearningJourneyStep findFirstOrThrow
   */
  export type LearningJourneyStepFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourneyStep to fetch.
     */
    where?: LearningJourneyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneySteps to fetch.
     */
    orderBy?: LearningJourneyStepOrderByWithRelationInput | LearningJourneyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LearningJourneySteps.
     */
    cursor?: LearningJourneyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneySteps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LearningJourneySteps.
     */
    distinct?: LearningJourneyStepScalarFieldEnum | LearningJourneyStepScalarFieldEnum[]
  }

  /**
   * LearningJourneyStep findMany
   */
  export type LearningJourneyStepFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * Filter, which LearningJourneySteps to fetch.
     */
    where?: LearningJourneyStepWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LearningJourneySteps to fetch.
     */
    orderBy?: LearningJourneyStepOrderByWithRelationInput | LearningJourneyStepOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LearningJourneySteps.
     */
    cursor?: LearningJourneyStepWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LearningJourneySteps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LearningJourneySteps.
     */
    skip?: number
    distinct?: LearningJourneyStepScalarFieldEnum | LearningJourneyStepScalarFieldEnum[]
  }

  /**
   * LearningJourneyStep create
   */
  export type LearningJourneyStepCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * The data needed to create a LearningJourneyStep.
     */
    data: XOR<LearningJourneyStepCreateInput, LearningJourneyStepUncheckedCreateInput>
  }

  /**
   * LearningJourneyStep createMany
   */
  export type LearningJourneyStepCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LearningJourneySteps.
     */
    data: LearningJourneyStepCreateManyInput | LearningJourneyStepCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LearningJourneyStep createManyAndReturn
   */
  export type LearningJourneyStepCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * The data used to create many LearningJourneySteps.
     */
    data: LearningJourneyStepCreateManyInput | LearningJourneyStepCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningJourneyStep update
   */
  export type LearningJourneyStepUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * The data needed to update a LearningJourneyStep.
     */
    data: XOR<LearningJourneyStepUpdateInput, LearningJourneyStepUncheckedUpdateInput>
    /**
     * Choose, which LearningJourneyStep to update.
     */
    where: LearningJourneyStepWhereUniqueInput
  }

  /**
   * LearningJourneyStep updateMany
   */
  export type LearningJourneyStepUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LearningJourneySteps.
     */
    data: XOR<LearningJourneyStepUpdateManyMutationInput, LearningJourneyStepUncheckedUpdateManyInput>
    /**
     * Filter which LearningJourneySteps to update
     */
    where?: LearningJourneyStepWhereInput
    /**
     * Limit how many LearningJourneySteps to update.
     */
    limit?: number
  }

  /**
   * LearningJourneyStep updateManyAndReturn
   */
  export type LearningJourneyStepUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * The data used to update LearningJourneySteps.
     */
    data: XOR<LearningJourneyStepUpdateManyMutationInput, LearningJourneyStepUncheckedUpdateManyInput>
    /**
     * Filter which LearningJourneySteps to update
     */
    where?: LearningJourneyStepWhereInput
    /**
     * Limit how many LearningJourneySteps to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LearningJourneyStep upsert
   */
  export type LearningJourneyStepUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * The filter to search for the LearningJourneyStep to update in case it exists.
     */
    where: LearningJourneyStepWhereUniqueInput
    /**
     * In case the LearningJourneyStep found by the `where` argument doesn't exist, create a new LearningJourneyStep with this data.
     */
    create: XOR<LearningJourneyStepCreateInput, LearningJourneyStepUncheckedCreateInput>
    /**
     * In case the LearningJourneyStep was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LearningJourneyStepUpdateInput, LearningJourneyStepUncheckedUpdateInput>
  }

  /**
   * LearningJourneyStep delete
   */
  export type LearningJourneyStepDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
    /**
     * Filter which LearningJourneyStep to delete.
     */
    where: LearningJourneyStepWhereUniqueInput
  }

  /**
   * LearningJourneyStep deleteMany
   */
  export type LearningJourneyStepDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LearningJourneySteps to delete
     */
    where?: LearningJourneyStepWhereInput
    /**
     * Limit how many LearningJourneySteps to delete.
     */
    limit?: number
  }

  /**
   * LearningJourneyStep.chats
   */
  export type LearningJourneyStep$chatsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningSessionChat
     */
    select?: LearningSessionChatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningSessionChat
     */
    omit?: LearningSessionChatOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningSessionChatInclude<ExtArgs> | null
    where?: LearningSessionChatWhereInput
    orderBy?: LearningSessionChatOrderByWithRelationInput | LearningSessionChatOrderByWithRelationInput[]
    cursor?: LearningSessionChatWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LearningSessionChatScalarFieldEnum | LearningSessionChatScalarFieldEnum[]
  }

  /**
   * LearningJourneyStep without action
   */
  export type LearningJourneyStepDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LearningJourneyStep
     */
    select?: LearningJourneyStepSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LearningJourneyStep
     */
    omit?: LearningJourneyStepOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LearningJourneyStepInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    passwordHash: 'passwordHash',
    picture: 'picture',
    role: 'role',
    botRole: 'botRole',
    profileTour: 'profileTour',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserGoalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    statement: 'statement',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserGoalScalarFieldEnum = (typeof UserGoalScalarFieldEnum)[keyof typeof UserGoalScalarFieldEnum]


  export const LearningSessionChatScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    sessionOutlineId: 'sessionOutlineId',
    stepId: 'stepId',
    sessionTitle: 'sessionTitle',
    startedAt: 'startedAt',
    endedAt: 'endedAt',
    lastMessageAt: 'lastMessageAt',
    metadata: 'metadata'
  };

  export type LearningSessionChatScalarFieldEnum = (typeof LearningSessionChatScalarFieldEnum)[keyof typeof LearningSessionChatScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    chatId: 'chatId',
    role: 'role',
    content: 'content',
    command: 'command',
    createdAt: 'createdAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const LearningJourneyScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    order: 'order',
    title: 'title',
    intro: 'intro',
    objectives: 'objectives',
    isStandard: 'isStandard',
    personalizedForUserId: 'personalizedForUserId',
    userGoalSummary: 'userGoalSummary',
    goalChatId: 'goalChatId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LearningJourneyScalarFieldEnum = (typeof LearningJourneyScalarFieldEnum)[keyof typeof LearningJourneyScalarFieldEnum]


  export const LearningSessionOutlineScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    order: 'order',
    title: 'title',
    objective: 'objective',
    content: 'content',
    botTools: 'botTools',
    firstUserMessage: 'firstUserMessage',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LearningSessionOutlineScalarFieldEnum = (typeof LearningSessionOutlineScalarFieldEnum)[keyof typeof LearningSessionOutlineScalarFieldEnum]


  export const LearningJourneyStepScalarFieldEnum: {
    id: 'id',
    journeyId: 'journeyId',
    sessionOutlineId: 'sessionOutlineId',
    order: 'order',
    status: 'status',
    ahaText: 'ahaText',
    unlockedAt: 'unlockedAt',
    completedAt: 'completedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type LearningJourneyStepScalarFieldEnum = (typeof LearningJourneyStepScalarFieldEnum)[keyof typeof LearningJourneyStepScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'GoalStatus'
   */
  export type EnumGoalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GoalStatus'>
    


  /**
   * Reference to a field of type 'GoalStatus[]'
   */
  export type ListEnumGoalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'GoalStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    picture?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    botRole?: StringFilter<"User"> | string
    profileTour?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    chats?: LearningSessionChatListRelationFilter
    journeys?: LearningJourneyListRelationFilter
    goals?: UserGoalListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    picture?: SortOrderInput | SortOrder
    role?: SortOrder
    botRole?: SortOrder
    profileTour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    chats?: LearningSessionChatOrderByRelationAggregateInput
    journeys?: LearningJourneyOrderByRelationAggregateInput
    goals?: UserGoalOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringNullableFilter<"User"> | string | null
    passwordHash?: StringFilter<"User"> | string
    picture?: StringNullableFilter<"User"> | string | null
    role?: StringFilter<"User"> | string
    botRole?: StringFilter<"User"> | string
    profileTour?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    chats?: LearningSessionChatListRelationFilter
    journeys?: LearningJourneyListRelationFilter
    goals?: UserGoalListRelationFilter
  }, "id" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    passwordHash?: SortOrder
    picture?: SortOrderInput | SortOrder
    role?: SortOrder
    botRole?: SortOrder
    profileTour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    picture?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: StringWithAggregatesFilter<"User"> | string
    botRole?: StringWithAggregatesFilter<"User"> | string
    profileTour?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserGoalWhereInput = {
    AND?: UserGoalWhereInput | UserGoalWhereInput[]
    OR?: UserGoalWhereInput[]
    NOT?: UserGoalWhereInput | UserGoalWhereInput[]
    id?: StringFilter<"UserGoal"> | string
    userId?: StringFilter<"UserGoal"> | string
    statement?: StringFilter<"UserGoal"> | string
    status?: EnumGoalStatusFilter<"UserGoal"> | $Enums.GoalStatus
    createdAt?: DateTimeFilter<"UserGoal"> | Date | string
    updatedAt?: DateTimeFilter<"UserGoal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserGoalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    statement?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type UserGoalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserGoalWhereInput | UserGoalWhereInput[]
    OR?: UserGoalWhereInput[]
    NOT?: UserGoalWhereInput | UserGoalWhereInput[]
    userId?: StringFilter<"UserGoal"> | string
    statement?: StringFilter<"UserGoal"> | string
    status?: EnumGoalStatusFilter<"UserGoal"> | $Enums.GoalStatus
    createdAt?: DateTimeFilter<"UserGoal"> | Date | string
    updatedAt?: DateTimeFilter<"UserGoal"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserGoalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    statement?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserGoalCountOrderByAggregateInput
    _max?: UserGoalMaxOrderByAggregateInput
    _min?: UserGoalMinOrderByAggregateInput
  }

  export type UserGoalScalarWhereWithAggregatesInput = {
    AND?: UserGoalScalarWhereWithAggregatesInput | UserGoalScalarWhereWithAggregatesInput[]
    OR?: UserGoalScalarWhereWithAggregatesInput[]
    NOT?: UserGoalScalarWhereWithAggregatesInput | UserGoalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserGoal"> | string
    userId?: StringWithAggregatesFilter<"UserGoal"> | string
    statement?: StringWithAggregatesFilter<"UserGoal"> | string
    status?: EnumGoalStatusWithAggregatesFilter<"UserGoal"> | $Enums.GoalStatus
    createdAt?: DateTimeWithAggregatesFilter<"UserGoal"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserGoal"> | Date | string
  }

  export type LearningSessionChatWhereInput = {
    AND?: LearningSessionChatWhereInput | LearningSessionChatWhereInput[]
    OR?: LearningSessionChatWhereInput[]
    NOT?: LearningSessionChatWhereInput | LearningSessionChatWhereInput[]
    id?: StringFilter<"LearningSessionChat"> | string
    userId?: StringNullableFilter<"LearningSessionChat"> | string | null
    sessionOutlineId?: StringNullableFilter<"LearningSessionChat"> | string | null
    stepId?: StringNullableFilter<"LearningSessionChat"> | string | null
    sessionTitle?: StringNullableFilter<"LearningSessionChat"> | string | null
    startedAt?: DateTimeFilter<"LearningSessionChat"> | Date | string
    endedAt?: DateTimeNullableFilter<"LearningSessionChat"> | Date | string | null
    lastMessageAt?: DateTimeNullableFilter<"LearningSessionChat"> | Date | string | null
    metadata?: JsonNullableFilter<"LearningSessionChat">
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    sessionOutline?: XOR<LearningSessionOutlineNullableScalarRelationFilter, LearningSessionOutlineWhereInput> | null
    step?: XOR<LearningJourneyStepNullableScalarRelationFilter, LearningJourneyStepWhereInput> | null
    messages?: MessageListRelationFilter
  }

  export type LearningSessionChatOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionOutlineId?: SortOrderInput | SortOrder
    stepId?: SortOrderInput | SortOrder
    sessionTitle?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    lastMessageAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
    sessionOutline?: LearningSessionOutlineOrderByWithRelationInput
    step?: LearningJourneyStepOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
  }

  export type LearningSessionChatWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LearningSessionChatWhereInput | LearningSessionChatWhereInput[]
    OR?: LearningSessionChatWhereInput[]
    NOT?: LearningSessionChatWhereInput | LearningSessionChatWhereInput[]
    userId?: StringNullableFilter<"LearningSessionChat"> | string | null
    sessionOutlineId?: StringNullableFilter<"LearningSessionChat"> | string | null
    stepId?: StringNullableFilter<"LearningSessionChat"> | string | null
    sessionTitle?: StringNullableFilter<"LearningSessionChat"> | string | null
    startedAt?: DateTimeFilter<"LearningSessionChat"> | Date | string
    endedAt?: DateTimeNullableFilter<"LearningSessionChat"> | Date | string | null
    lastMessageAt?: DateTimeNullableFilter<"LearningSessionChat"> | Date | string | null
    metadata?: JsonNullableFilter<"LearningSessionChat">
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    sessionOutline?: XOR<LearningSessionOutlineNullableScalarRelationFilter, LearningSessionOutlineWhereInput> | null
    step?: XOR<LearningJourneyStepNullableScalarRelationFilter, LearningJourneyStepWhereInput> | null
    messages?: MessageListRelationFilter
  }, "id">

  export type LearningSessionChatOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    sessionOutlineId?: SortOrderInput | SortOrder
    stepId?: SortOrderInput | SortOrder
    sessionTitle?: SortOrderInput | SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrderInput | SortOrder
    lastMessageAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    _count?: LearningSessionChatCountOrderByAggregateInput
    _max?: LearningSessionChatMaxOrderByAggregateInput
    _min?: LearningSessionChatMinOrderByAggregateInput
  }

  export type LearningSessionChatScalarWhereWithAggregatesInput = {
    AND?: LearningSessionChatScalarWhereWithAggregatesInput | LearningSessionChatScalarWhereWithAggregatesInput[]
    OR?: LearningSessionChatScalarWhereWithAggregatesInput[]
    NOT?: LearningSessionChatScalarWhereWithAggregatesInput | LearningSessionChatScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningSessionChat"> | string
    userId?: StringNullableWithAggregatesFilter<"LearningSessionChat"> | string | null
    sessionOutlineId?: StringNullableWithAggregatesFilter<"LearningSessionChat"> | string | null
    stepId?: StringNullableWithAggregatesFilter<"LearningSessionChat"> | string | null
    sessionTitle?: StringNullableWithAggregatesFilter<"LearningSessionChat"> | string | null
    startedAt?: DateTimeWithAggregatesFilter<"LearningSessionChat"> | Date | string
    endedAt?: DateTimeNullableWithAggregatesFilter<"LearningSessionChat"> | Date | string | null
    lastMessageAt?: DateTimeNullableWithAggregatesFilter<"LearningSessionChat"> | Date | string | null
    metadata?: JsonNullableWithAggregatesFilter<"LearningSessionChat">
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    chatId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    command?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
    chat?: XOR<LearningSessionChatScalarRelationFilter, LearningSessionChatWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    chatId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    command?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    chat?: LearningSessionChatOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    chatId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    command?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
    chat?: XOR<LearningSessionChatScalarRelationFilter, LearningSessionChatWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    chatId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    command?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    chatId?: StringWithAggregatesFilter<"Message"> | string
    role?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    command?: JsonNullableWithAggregatesFilter<"Message">
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type LearningJourneyWhereInput = {
    AND?: LearningJourneyWhereInput | LearningJourneyWhereInput[]
    OR?: LearningJourneyWhereInput[]
    NOT?: LearningJourneyWhereInput | LearningJourneyWhereInput[]
    id?: StringFilter<"LearningJourney"> | string
    slug?: StringNullableFilter<"LearningJourney"> | string | null
    order?: IntNullableFilter<"LearningJourney"> | number | null
    title?: StringFilter<"LearningJourney"> | string
    intro?: StringNullableFilter<"LearningJourney"> | string | null
    objectives?: JsonNullableFilter<"LearningJourney">
    isStandard?: BoolFilter<"LearningJourney"> | boolean
    personalizedForUserId?: StringNullableFilter<"LearningJourney"> | string | null
    userGoalSummary?: StringNullableFilter<"LearningJourney"> | string | null
    goalChatId?: StringNullableFilter<"LearningJourney"> | string | null
    status?: StringFilter<"LearningJourney"> | string
    createdAt?: DateTimeFilter<"LearningJourney"> | Date | string
    updatedAt?: DateTimeFilter<"LearningJourney"> | Date | string
    personalizedForUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    steps?: LearningJourneyStepListRelationFilter
  }

  export type LearningJourneyOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    title?: SortOrder
    intro?: SortOrderInput | SortOrder
    objectives?: SortOrderInput | SortOrder
    isStandard?: SortOrder
    personalizedForUserId?: SortOrderInput | SortOrder
    userGoalSummary?: SortOrderInput | SortOrder
    goalChatId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    personalizedForUser?: UserOrderByWithRelationInput
    steps?: LearningJourneyStepOrderByRelationAggregateInput
  }

  export type LearningJourneyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: LearningJourneyWhereInput | LearningJourneyWhereInput[]
    OR?: LearningJourneyWhereInput[]
    NOT?: LearningJourneyWhereInput | LearningJourneyWhereInput[]
    order?: IntNullableFilter<"LearningJourney"> | number | null
    title?: StringFilter<"LearningJourney"> | string
    intro?: StringNullableFilter<"LearningJourney"> | string | null
    objectives?: JsonNullableFilter<"LearningJourney">
    isStandard?: BoolFilter<"LearningJourney"> | boolean
    personalizedForUserId?: StringNullableFilter<"LearningJourney"> | string | null
    userGoalSummary?: StringNullableFilter<"LearningJourney"> | string | null
    goalChatId?: StringNullableFilter<"LearningJourney"> | string | null
    status?: StringFilter<"LearningJourney"> | string
    createdAt?: DateTimeFilter<"LearningJourney"> | Date | string
    updatedAt?: DateTimeFilter<"LearningJourney"> | Date | string
    personalizedForUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    steps?: LearningJourneyStepListRelationFilter
  }, "id" | "slug">

  export type LearningJourneyOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrderInput | SortOrder
    order?: SortOrderInput | SortOrder
    title?: SortOrder
    intro?: SortOrderInput | SortOrder
    objectives?: SortOrderInput | SortOrder
    isStandard?: SortOrder
    personalizedForUserId?: SortOrderInput | SortOrder
    userGoalSummary?: SortOrderInput | SortOrder
    goalChatId?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LearningJourneyCountOrderByAggregateInput
    _avg?: LearningJourneyAvgOrderByAggregateInput
    _max?: LearningJourneyMaxOrderByAggregateInput
    _min?: LearningJourneyMinOrderByAggregateInput
    _sum?: LearningJourneySumOrderByAggregateInput
  }

  export type LearningJourneyScalarWhereWithAggregatesInput = {
    AND?: LearningJourneyScalarWhereWithAggregatesInput | LearningJourneyScalarWhereWithAggregatesInput[]
    OR?: LearningJourneyScalarWhereWithAggregatesInput[]
    NOT?: LearningJourneyScalarWhereWithAggregatesInput | LearningJourneyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningJourney"> | string
    slug?: StringNullableWithAggregatesFilter<"LearningJourney"> | string | null
    order?: IntNullableWithAggregatesFilter<"LearningJourney"> | number | null
    title?: StringWithAggregatesFilter<"LearningJourney"> | string
    intro?: StringNullableWithAggregatesFilter<"LearningJourney"> | string | null
    objectives?: JsonNullableWithAggregatesFilter<"LearningJourney">
    isStandard?: BoolWithAggregatesFilter<"LearningJourney"> | boolean
    personalizedForUserId?: StringNullableWithAggregatesFilter<"LearningJourney"> | string | null
    userGoalSummary?: StringNullableWithAggregatesFilter<"LearningJourney"> | string | null
    goalChatId?: StringNullableWithAggregatesFilter<"LearningJourney"> | string | null
    status?: StringWithAggregatesFilter<"LearningJourney"> | string
    createdAt?: DateTimeWithAggregatesFilter<"LearningJourney"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LearningJourney"> | Date | string
  }

  export type LearningSessionOutlineWhereInput = {
    AND?: LearningSessionOutlineWhereInput | LearningSessionOutlineWhereInput[]
    OR?: LearningSessionOutlineWhereInput[]
    NOT?: LearningSessionOutlineWhereInput | LearningSessionOutlineWhereInput[]
    id?: StringFilter<"LearningSessionOutline"> | string
    slug?: StringFilter<"LearningSessionOutline"> | string
    order?: IntFilter<"LearningSessionOutline"> | number
    title?: StringFilter<"LearningSessionOutline"> | string
    objective?: StringNullableFilter<"LearningSessionOutline"> | string | null
    content?: StringFilter<"LearningSessionOutline"> | string
    botTools?: StringFilter<"LearningSessionOutline"> | string
    firstUserMessage?: StringFilter<"LearningSessionOutline"> | string
    tags?: JsonNullableFilter<"LearningSessionOutline">
    createdAt?: DateTimeFilter<"LearningSessionOutline"> | Date | string
    updatedAt?: DateTimeFilter<"LearningSessionOutline"> | Date | string
    steps?: LearningJourneyStepListRelationFilter
    learningSessionChats?: LearningSessionChatListRelationFilter
  }

  export type LearningSessionOutlineOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    objective?: SortOrderInput | SortOrder
    content?: SortOrder
    botTools?: SortOrder
    firstUserMessage?: SortOrder
    tags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    steps?: LearningJourneyStepOrderByRelationAggregateInput
    learningSessionChats?: LearningSessionChatOrderByRelationAggregateInput
  }

  export type LearningSessionOutlineWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: LearningSessionOutlineWhereInput | LearningSessionOutlineWhereInput[]
    OR?: LearningSessionOutlineWhereInput[]
    NOT?: LearningSessionOutlineWhereInput | LearningSessionOutlineWhereInput[]
    order?: IntFilter<"LearningSessionOutline"> | number
    title?: StringFilter<"LearningSessionOutline"> | string
    objective?: StringNullableFilter<"LearningSessionOutline"> | string | null
    content?: StringFilter<"LearningSessionOutline"> | string
    botTools?: StringFilter<"LearningSessionOutline"> | string
    firstUserMessage?: StringFilter<"LearningSessionOutline"> | string
    tags?: JsonNullableFilter<"LearningSessionOutline">
    createdAt?: DateTimeFilter<"LearningSessionOutline"> | Date | string
    updatedAt?: DateTimeFilter<"LearningSessionOutline"> | Date | string
    steps?: LearningJourneyStepListRelationFilter
    learningSessionChats?: LearningSessionChatListRelationFilter
  }, "id" | "slug">

  export type LearningSessionOutlineOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    objective?: SortOrderInput | SortOrder
    content?: SortOrder
    botTools?: SortOrder
    firstUserMessage?: SortOrder
    tags?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LearningSessionOutlineCountOrderByAggregateInput
    _avg?: LearningSessionOutlineAvgOrderByAggregateInput
    _max?: LearningSessionOutlineMaxOrderByAggregateInput
    _min?: LearningSessionOutlineMinOrderByAggregateInput
    _sum?: LearningSessionOutlineSumOrderByAggregateInput
  }

  export type LearningSessionOutlineScalarWhereWithAggregatesInput = {
    AND?: LearningSessionOutlineScalarWhereWithAggregatesInput | LearningSessionOutlineScalarWhereWithAggregatesInput[]
    OR?: LearningSessionOutlineScalarWhereWithAggregatesInput[]
    NOT?: LearningSessionOutlineScalarWhereWithAggregatesInput | LearningSessionOutlineScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningSessionOutline"> | string
    slug?: StringWithAggregatesFilter<"LearningSessionOutline"> | string
    order?: IntWithAggregatesFilter<"LearningSessionOutline"> | number
    title?: StringWithAggregatesFilter<"LearningSessionOutline"> | string
    objective?: StringNullableWithAggregatesFilter<"LearningSessionOutline"> | string | null
    content?: StringWithAggregatesFilter<"LearningSessionOutline"> | string
    botTools?: StringWithAggregatesFilter<"LearningSessionOutline"> | string
    firstUserMessage?: StringWithAggregatesFilter<"LearningSessionOutline"> | string
    tags?: JsonNullableWithAggregatesFilter<"LearningSessionOutline">
    createdAt?: DateTimeWithAggregatesFilter<"LearningSessionOutline"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LearningSessionOutline"> | Date | string
  }

  export type LearningJourneyStepWhereInput = {
    AND?: LearningJourneyStepWhereInput | LearningJourneyStepWhereInput[]
    OR?: LearningJourneyStepWhereInput[]
    NOT?: LearningJourneyStepWhereInput | LearningJourneyStepWhereInput[]
    id?: StringFilter<"LearningJourneyStep"> | string
    journeyId?: StringFilter<"LearningJourneyStep"> | string
    sessionOutlineId?: StringFilter<"LearningJourneyStep"> | string
    order?: IntFilter<"LearningJourneyStep"> | number
    status?: StringFilter<"LearningJourneyStep"> | string
    ahaText?: StringNullableFilter<"LearningJourneyStep"> | string | null
    unlockedAt?: DateTimeNullableFilter<"LearningJourneyStep"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"LearningJourneyStep"> | Date | string | null
    createdAt?: DateTimeFilter<"LearningJourneyStep"> | Date | string
    updatedAt?: DateTimeFilter<"LearningJourneyStep"> | Date | string
    journey?: XOR<LearningJourneyScalarRelationFilter, LearningJourneyWhereInput>
    sessionOutline?: XOR<LearningSessionOutlineScalarRelationFilter, LearningSessionOutlineWhereInput>
    chats?: LearningSessionChatListRelationFilter
  }

  export type LearningJourneyStepOrderByWithRelationInput = {
    id?: SortOrder
    journeyId?: SortOrder
    sessionOutlineId?: SortOrder
    order?: SortOrder
    status?: SortOrder
    ahaText?: SortOrderInput | SortOrder
    unlockedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    journey?: LearningJourneyOrderByWithRelationInput
    sessionOutline?: LearningSessionOutlineOrderByWithRelationInput
    chats?: LearningSessionChatOrderByRelationAggregateInput
  }

  export type LearningJourneyStepWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    journeyId_order?: LearningJourneyStepJourneyIdOrderCompoundUniqueInput
    AND?: LearningJourneyStepWhereInput | LearningJourneyStepWhereInput[]
    OR?: LearningJourneyStepWhereInput[]
    NOT?: LearningJourneyStepWhereInput | LearningJourneyStepWhereInput[]
    journeyId?: StringFilter<"LearningJourneyStep"> | string
    sessionOutlineId?: StringFilter<"LearningJourneyStep"> | string
    order?: IntFilter<"LearningJourneyStep"> | number
    status?: StringFilter<"LearningJourneyStep"> | string
    ahaText?: StringNullableFilter<"LearningJourneyStep"> | string | null
    unlockedAt?: DateTimeNullableFilter<"LearningJourneyStep"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"LearningJourneyStep"> | Date | string | null
    createdAt?: DateTimeFilter<"LearningJourneyStep"> | Date | string
    updatedAt?: DateTimeFilter<"LearningJourneyStep"> | Date | string
    journey?: XOR<LearningJourneyScalarRelationFilter, LearningJourneyWhereInput>
    sessionOutline?: XOR<LearningSessionOutlineScalarRelationFilter, LearningSessionOutlineWhereInput>
    chats?: LearningSessionChatListRelationFilter
  }, "id" | "journeyId_order">

  export type LearningJourneyStepOrderByWithAggregationInput = {
    id?: SortOrder
    journeyId?: SortOrder
    sessionOutlineId?: SortOrder
    order?: SortOrder
    status?: SortOrder
    ahaText?: SortOrderInput | SortOrder
    unlockedAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: LearningJourneyStepCountOrderByAggregateInput
    _avg?: LearningJourneyStepAvgOrderByAggregateInput
    _max?: LearningJourneyStepMaxOrderByAggregateInput
    _min?: LearningJourneyStepMinOrderByAggregateInput
    _sum?: LearningJourneyStepSumOrderByAggregateInput
  }

  export type LearningJourneyStepScalarWhereWithAggregatesInput = {
    AND?: LearningJourneyStepScalarWhereWithAggregatesInput | LearningJourneyStepScalarWhereWithAggregatesInput[]
    OR?: LearningJourneyStepScalarWhereWithAggregatesInput[]
    NOT?: LearningJourneyStepScalarWhereWithAggregatesInput | LearningJourneyStepScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LearningJourneyStep"> | string
    journeyId?: StringWithAggregatesFilter<"LearningJourneyStep"> | string
    sessionOutlineId?: StringWithAggregatesFilter<"LearningJourneyStep"> | string
    order?: IntWithAggregatesFilter<"LearningJourneyStep"> | number
    status?: StringWithAggregatesFilter<"LearningJourneyStep"> | string
    ahaText?: StringNullableWithAggregatesFilter<"LearningJourneyStep"> | string | null
    unlockedAt?: DateTimeNullableWithAggregatesFilter<"LearningJourneyStep"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"LearningJourneyStep"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LearningJourneyStep"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"LearningJourneyStep"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatCreateNestedManyWithoutUserInput
    journeys?: LearningJourneyCreateNestedManyWithoutPersonalizedForUserInput
    goals?: UserGoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatUncheckedCreateNestedManyWithoutUserInput
    journeys?: LearningJourneyUncheckedCreateNestedManyWithoutPersonalizedForUserInput
    goals?: UserGoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUpdateManyWithoutUserNestedInput
    journeys?: LearningJourneyUpdateManyWithoutPersonalizedForUserNestedInput
    goals?: UserGoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUncheckedUpdateManyWithoutUserNestedInput
    journeys?: LearningJourneyUncheckedUpdateManyWithoutPersonalizedForUserNestedInput
    goals?: UserGoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGoalCreateInput = {
    id?: string
    statement: string
    status?: $Enums.GoalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutGoalsInput
  }

  export type UserGoalUncheckedCreateInput = {
    id?: string
    userId: string
    statement: string
    status?: $Enums.GoalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGoalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement?: StringFieldUpdateOperationsInput | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutGoalsNestedInput
  }

  export type UserGoalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statement?: StringFieldUpdateOperationsInput | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGoalCreateManyInput = {
    id?: string
    userId: string
    statement: string
    status?: $Enums.GoalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGoalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement?: StringFieldUpdateOperationsInput | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGoalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    statement?: StringFieldUpdateOperationsInput | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningSessionChatCreateInput = {
    id?: string
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserCreateNestedOneWithoutChatsInput
    sessionOutline?: LearningSessionOutlineCreateNestedOneWithoutLearningSessionChatsInput
    step?: LearningJourneyStepCreateNestedOneWithoutChatsInput
    messages?: MessageCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatUncheckedCreateInput = {
    id?: string
    userId?: string | null
    sessionOutlineId?: string | null
    stepId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneWithoutChatsNestedInput
    sessionOutline?: LearningSessionOutlineUpdateOneWithoutLearningSessionChatsNestedInput
    step?: LearningJourneyStepUpdateOneWithoutChatsNestedInput
    messages?: MessageUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionOutlineId?: NullableStringFieldUpdateOperationsInput | string | null
    stepId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatCreateManyInput = {
    id?: string
    userId?: string | null
    sessionOutlineId?: string | null
    stepId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningSessionChatUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningSessionChatUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionOutlineId?: NullableStringFieldUpdateOperationsInput | string | null
    stepId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type MessageCreateInput = {
    id?: string
    role: string
    content: string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    chat: LearningSessionChatCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    chatId: string
    role: string
    content: string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chat?: LearningSessionChatUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    chatId: string
    role: string
    content: string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    chatId?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningJourneyCreateInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    personalizedForUser?: UserCreateNestedOneWithoutJourneysInput
    steps?: LearningJourneyStepCreateNestedManyWithoutJourneyInput
  }

  export type LearningJourneyUncheckedCreateInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    personalizedForUserId?: string | null
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: LearningJourneyStepUncheckedCreateNestedManyWithoutJourneyInput
  }

  export type LearningJourneyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personalizedForUser?: UserUpdateOneWithoutJourneysNestedInput
    steps?: LearningJourneyStepUpdateManyWithoutJourneyNestedInput
  }

  export type LearningJourneyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    personalizedForUserId?: NullableStringFieldUpdateOperationsInput | string | null
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: LearningJourneyStepUncheckedUpdateManyWithoutJourneyNestedInput
  }

  export type LearningJourneyCreateManyInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    personalizedForUserId?: string | null
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningJourneyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningJourneyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    personalizedForUserId?: NullableStringFieldUpdateOperationsInput | string | null
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningSessionOutlineCreateInput = {
    id?: string
    slug: string
    order: number
    title: string
    objective?: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: LearningJourneyStepCreateNestedManyWithoutSessionOutlineInput
    learningSessionChats?: LearningSessionChatCreateNestedManyWithoutSessionOutlineInput
  }

  export type LearningSessionOutlineUncheckedCreateInput = {
    id?: string
    slug: string
    order: number
    title: string
    objective?: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: LearningJourneyStepUncheckedCreateNestedManyWithoutSessionOutlineInput
    learningSessionChats?: LearningSessionChatUncheckedCreateNestedManyWithoutSessionOutlineInput
  }

  export type LearningSessionOutlineUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: LearningJourneyStepUpdateManyWithoutSessionOutlineNestedInput
    learningSessionChats?: LearningSessionChatUpdateManyWithoutSessionOutlineNestedInput
  }

  export type LearningSessionOutlineUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: LearningJourneyStepUncheckedUpdateManyWithoutSessionOutlineNestedInput
    learningSessionChats?: LearningSessionChatUncheckedUpdateManyWithoutSessionOutlineNestedInput
  }

  export type LearningSessionOutlineCreateManyInput = {
    id?: string
    slug: string
    order: number
    title: string
    objective?: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningSessionOutlineUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningSessionOutlineUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningJourneyStepCreateInput = {
    id?: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journey: LearningJourneyCreateNestedOneWithoutStepsInput
    sessionOutline: LearningSessionOutlineCreateNestedOneWithoutStepsInput
    chats?: LearningSessionChatCreateNestedManyWithoutStepInput
  }

  export type LearningJourneyStepUncheckedCreateInput = {
    id?: string
    journeyId: string
    sessionOutlineId: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatUncheckedCreateNestedManyWithoutStepInput
  }

  export type LearningJourneyStepUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journey?: LearningJourneyUpdateOneRequiredWithoutStepsNestedInput
    sessionOutline?: LearningSessionOutlineUpdateOneRequiredWithoutStepsNestedInput
    chats?: LearningSessionChatUpdateManyWithoutStepNestedInput
  }

  export type LearningJourneyStepUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    journeyId?: StringFieldUpdateOperationsInput | string
    sessionOutlineId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUncheckedUpdateManyWithoutStepNestedInput
  }

  export type LearningJourneyStepCreateManyInput = {
    id?: string
    journeyId: string
    sessionOutlineId: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningJourneyStepUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningJourneyStepUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    journeyId?: StringFieldUpdateOperationsInput | string
    sessionOutlineId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type LearningSessionChatListRelationFilter = {
    every?: LearningSessionChatWhereInput
    some?: LearningSessionChatWhereInput
    none?: LearningSessionChatWhereInput
  }

  export type LearningJourneyListRelationFilter = {
    every?: LearningJourneyWhereInput
    some?: LearningJourneyWhereInput
    none?: LearningJourneyWhereInput
  }

  export type UserGoalListRelationFilter = {
    every?: UserGoalWhereInput
    some?: UserGoalWhereInput
    none?: UserGoalWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LearningSessionChatOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningJourneyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserGoalOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    picture?: SortOrder
    role?: SortOrder
    botRole?: SortOrder
    profileTour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    picture?: SortOrder
    role?: SortOrder
    botRole?: SortOrder
    profileTour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    passwordHash?: SortOrder
    picture?: SortOrder
    role?: SortOrder
    botRole?: SortOrder
    profileTour?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumGoalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusFilter<$PrismaModel> | $Enums.GoalStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserGoalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statement?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserGoalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statement?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserGoalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    statement?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumGoalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusWithAggregatesFilter<$PrismaModel> | $Enums.GoalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGoalStatusFilter<$PrismaModel>
    _max?: NestedEnumGoalStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type LearningSessionOutlineNullableScalarRelationFilter = {
    is?: LearningSessionOutlineWhereInput | null
    isNot?: LearningSessionOutlineWhereInput | null
  }

  export type LearningJourneyStepNullableScalarRelationFilter = {
    is?: LearningJourneyStepWhereInput | null
    isNot?: LearningJourneyStepWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningSessionChatCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionOutlineId?: SortOrder
    stepId?: SortOrder
    sessionTitle?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    lastMessageAt?: SortOrder
    metadata?: SortOrder
  }

  export type LearningSessionChatMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionOutlineId?: SortOrder
    stepId?: SortOrder
    sessionTitle?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type LearningSessionChatMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    sessionOutlineId?: SortOrder
    stepId?: SortOrder
    sessionTitle?: SortOrder
    startedAt?: SortOrder
    endedAt?: SortOrder
    lastMessageAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type LearningSessionChatScalarRelationFilter = {
    is?: LearningSessionChatWhereInput
    isNot?: LearningSessionChatWhereInput
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    command?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    chatId?: SortOrder
    role?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LearningJourneyStepListRelationFilter = {
    every?: LearningJourneyStepWhereInput
    some?: LearningJourneyStepWhereInput
    none?: LearningJourneyStepWhereInput
  }

  export type LearningJourneyStepOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LearningJourneyCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    intro?: SortOrder
    objectives?: SortOrder
    isStandard?: SortOrder
    personalizedForUserId?: SortOrder
    userGoalSummary?: SortOrder
    goalChatId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningJourneyAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type LearningJourneyMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    intro?: SortOrder
    isStandard?: SortOrder
    personalizedForUserId?: SortOrder
    userGoalSummary?: SortOrder
    goalChatId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningJourneyMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    intro?: SortOrder
    isStandard?: SortOrder
    personalizedForUserId?: SortOrder
    userGoalSummary?: SortOrder
    goalChatId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningJourneySumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type LearningSessionOutlineCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    objective?: SortOrder
    content?: SortOrder
    botTools?: SortOrder
    firstUserMessage?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningSessionOutlineAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type LearningSessionOutlineMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    objective?: SortOrder
    content?: SortOrder
    botTools?: SortOrder
    firstUserMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningSessionOutlineMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    order?: SortOrder
    title?: SortOrder
    objective?: SortOrder
    content?: SortOrder
    botTools?: SortOrder
    firstUserMessage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningSessionOutlineSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type LearningJourneyScalarRelationFilter = {
    is?: LearningJourneyWhereInput
    isNot?: LearningJourneyWhereInput
  }

  export type LearningSessionOutlineScalarRelationFilter = {
    is?: LearningSessionOutlineWhereInput
    isNot?: LearningSessionOutlineWhereInput
  }

  export type LearningJourneyStepJourneyIdOrderCompoundUniqueInput = {
    journeyId: string
    order: number
  }

  export type LearningJourneyStepCountOrderByAggregateInput = {
    id?: SortOrder
    journeyId?: SortOrder
    sessionOutlineId?: SortOrder
    order?: SortOrder
    status?: SortOrder
    ahaText?: SortOrder
    unlockedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningJourneyStepAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type LearningJourneyStepMaxOrderByAggregateInput = {
    id?: SortOrder
    journeyId?: SortOrder
    sessionOutlineId?: SortOrder
    order?: SortOrder
    status?: SortOrder
    ahaText?: SortOrder
    unlockedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningJourneyStepMinOrderByAggregateInput = {
    id?: SortOrder
    journeyId?: SortOrder
    sessionOutlineId?: SortOrder
    order?: SortOrder
    status?: SortOrder
    ahaText?: SortOrder
    unlockedAt?: SortOrder
    completedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type LearningJourneyStepSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type LearningSessionChatCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningSessionChatCreateWithoutUserInput, LearningSessionChatUncheckedCreateWithoutUserInput> | LearningSessionChatCreateWithoutUserInput[] | LearningSessionChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutUserInput | LearningSessionChatCreateOrConnectWithoutUserInput[]
    createMany?: LearningSessionChatCreateManyUserInputEnvelope
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
  }

  export type LearningJourneyCreateNestedManyWithoutPersonalizedForUserInput = {
    create?: XOR<LearningJourneyCreateWithoutPersonalizedForUserInput, LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput> | LearningJourneyCreateWithoutPersonalizedForUserInput[] | LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput[]
    connectOrCreate?: LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput | LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput[]
    createMany?: LearningJourneyCreateManyPersonalizedForUserInputEnvelope
    connect?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
  }

  export type UserGoalCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGoalCreateWithoutUserInput, UserGoalUncheckedCreateWithoutUserInput> | UserGoalCreateWithoutUserInput[] | UserGoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGoalCreateOrConnectWithoutUserInput | UserGoalCreateOrConnectWithoutUserInput[]
    createMany?: UserGoalCreateManyUserInputEnvelope
    connect?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
  }

  export type LearningSessionChatUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<LearningSessionChatCreateWithoutUserInput, LearningSessionChatUncheckedCreateWithoutUserInput> | LearningSessionChatCreateWithoutUserInput[] | LearningSessionChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutUserInput | LearningSessionChatCreateOrConnectWithoutUserInput[]
    createMany?: LearningSessionChatCreateManyUserInputEnvelope
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
  }

  export type LearningJourneyUncheckedCreateNestedManyWithoutPersonalizedForUserInput = {
    create?: XOR<LearningJourneyCreateWithoutPersonalizedForUserInput, LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput> | LearningJourneyCreateWithoutPersonalizedForUserInput[] | LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput[]
    connectOrCreate?: LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput | LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput[]
    createMany?: LearningJourneyCreateManyPersonalizedForUserInputEnvelope
    connect?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
  }

  export type UserGoalUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserGoalCreateWithoutUserInput, UserGoalUncheckedCreateWithoutUserInput> | UserGoalCreateWithoutUserInput[] | UserGoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGoalCreateOrConnectWithoutUserInput | UserGoalCreateOrConnectWithoutUserInput[]
    createMany?: UserGoalCreateManyUserInputEnvelope
    connect?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LearningSessionChatUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningSessionChatCreateWithoutUserInput, LearningSessionChatUncheckedCreateWithoutUserInput> | LearningSessionChatCreateWithoutUserInput[] | LearningSessionChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutUserInput | LearningSessionChatCreateOrConnectWithoutUserInput[]
    upsert?: LearningSessionChatUpsertWithWhereUniqueWithoutUserInput | LearningSessionChatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningSessionChatCreateManyUserInputEnvelope
    set?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    disconnect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    delete?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    update?: LearningSessionChatUpdateWithWhereUniqueWithoutUserInput | LearningSessionChatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningSessionChatUpdateManyWithWhereWithoutUserInput | LearningSessionChatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
  }

  export type LearningJourneyUpdateManyWithoutPersonalizedForUserNestedInput = {
    create?: XOR<LearningJourneyCreateWithoutPersonalizedForUserInput, LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput> | LearningJourneyCreateWithoutPersonalizedForUserInput[] | LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput[]
    connectOrCreate?: LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput | LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput[]
    upsert?: LearningJourneyUpsertWithWhereUniqueWithoutPersonalizedForUserInput | LearningJourneyUpsertWithWhereUniqueWithoutPersonalizedForUserInput[]
    createMany?: LearningJourneyCreateManyPersonalizedForUserInputEnvelope
    set?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    disconnect?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    delete?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    connect?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    update?: LearningJourneyUpdateWithWhereUniqueWithoutPersonalizedForUserInput | LearningJourneyUpdateWithWhereUniqueWithoutPersonalizedForUserInput[]
    updateMany?: LearningJourneyUpdateManyWithWhereWithoutPersonalizedForUserInput | LearningJourneyUpdateManyWithWhereWithoutPersonalizedForUserInput[]
    deleteMany?: LearningJourneyScalarWhereInput | LearningJourneyScalarWhereInput[]
  }

  export type UserGoalUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGoalCreateWithoutUserInput, UserGoalUncheckedCreateWithoutUserInput> | UserGoalCreateWithoutUserInput[] | UserGoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGoalCreateOrConnectWithoutUserInput | UserGoalCreateOrConnectWithoutUserInput[]
    upsert?: UserGoalUpsertWithWhereUniqueWithoutUserInput | UserGoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGoalCreateManyUserInputEnvelope
    set?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    disconnect?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    delete?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    connect?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    update?: UserGoalUpdateWithWhereUniqueWithoutUserInput | UserGoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGoalUpdateManyWithWhereWithoutUserInput | UserGoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGoalScalarWhereInput | UserGoalScalarWhereInput[]
  }

  export type LearningSessionChatUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<LearningSessionChatCreateWithoutUserInput, LearningSessionChatUncheckedCreateWithoutUserInput> | LearningSessionChatCreateWithoutUserInput[] | LearningSessionChatUncheckedCreateWithoutUserInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutUserInput | LearningSessionChatCreateOrConnectWithoutUserInput[]
    upsert?: LearningSessionChatUpsertWithWhereUniqueWithoutUserInput | LearningSessionChatUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: LearningSessionChatCreateManyUserInputEnvelope
    set?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    disconnect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    delete?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    update?: LearningSessionChatUpdateWithWhereUniqueWithoutUserInput | LearningSessionChatUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: LearningSessionChatUpdateManyWithWhereWithoutUserInput | LearningSessionChatUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
  }

  export type LearningJourneyUncheckedUpdateManyWithoutPersonalizedForUserNestedInput = {
    create?: XOR<LearningJourneyCreateWithoutPersonalizedForUserInput, LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput> | LearningJourneyCreateWithoutPersonalizedForUserInput[] | LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput[]
    connectOrCreate?: LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput | LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput[]
    upsert?: LearningJourneyUpsertWithWhereUniqueWithoutPersonalizedForUserInput | LearningJourneyUpsertWithWhereUniqueWithoutPersonalizedForUserInput[]
    createMany?: LearningJourneyCreateManyPersonalizedForUserInputEnvelope
    set?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    disconnect?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    delete?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    connect?: LearningJourneyWhereUniqueInput | LearningJourneyWhereUniqueInput[]
    update?: LearningJourneyUpdateWithWhereUniqueWithoutPersonalizedForUserInput | LearningJourneyUpdateWithWhereUniqueWithoutPersonalizedForUserInput[]
    updateMany?: LearningJourneyUpdateManyWithWhereWithoutPersonalizedForUserInput | LearningJourneyUpdateManyWithWhereWithoutPersonalizedForUserInput[]
    deleteMany?: LearningJourneyScalarWhereInput | LearningJourneyScalarWhereInput[]
  }

  export type UserGoalUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserGoalCreateWithoutUserInput, UserGoalUncheckedCreateWithoutUserInput> | UserGoalCreateWithoutUserInput[] | UserGoalUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserGoalCreateOrConnectWithoutUserInput | UserGoalCreateOrConnectWithoutUserInput[]
    upsert?: UserGoalUpsertWithWhereUniqueWithoutUserInput | UserGoalUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserGoalCreateManyUserInputEnvelope
    set?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    disconnect?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    delete?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    connect?: UserGoalWhereUniqueInput | UserGoalWhereUniqueInput[]
    update?: UserGoalUpdateWithWhereUniqueWithoutUserInput | UserGoalUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserGoalUpdateManyWithWhereWithoutUserInput | UserGoalUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserGoalScalarWhereInput | UserGoalScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutGoalsInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumGoalStatusFieldUpdateOperationsInput = {
    set?: $Enums.GoalStatus
  }

  export type UserUpdateOneRequiredWithoutGoalsNestedInput = {
    create?: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    connectOrCreate?: UserCreateOrConnectWithoutGoalsInput
    upsert?: UserUpsertWithoutGoalsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutGoalsInput, UserUpdateWithoutGoalsInput>, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type UserCreateNestedOneWithoutChatsInput = {
    create?: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsInput
    connect?: UserWhereUniqueInput
  }

  export type LearningSessionOutlineCreateNestedOneWithoutLearningSessionChatsInput = {
    create?: XOR<LearningSessionOutlineCreateWithoutLearningSessionChatsInput, LearningSessionOutlineUncheckedCreateWithoutLearningSessionChatsInput>
    connectOrCreate?: LearningSessionOutlineCreateOrConnectWithoutLearningSessionChatsInput
    connect?: LearningSessionOutlineWhereUniqueInput
  }

  export type LearningJourneyStepCreateNestedOneWithoutChatsInput = {
    create?: XOR<LearningJourneyStepCreateWithoutChatsInput, LearningJourneyStepUncheckedCreateWithoutChatsInput>
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutChatsInput
    connect?: LearningJourneyStepWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutChatInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type MessageUncheckedCreateNestedManyWithoutChatInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutChatsNestedInput = {
    create?: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
    connectOrCreate?: UserCreateOrConnectWithoutChatsInput
    upsert?: UserUpsertWithoutChatsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutChatsInput, UserUpdateWithoutChatsInput>, UserUncheckedUpdateWithoutChatsInput>
  }

  export type LearningSessionOutlineUpdateOneWithoutLearningSessionChatsNestedInput = {
    create?: XOR<LearningSessionOutlineCreateWithoutLearningSessionChatsInput, LearningSessionOutlineUncheckedCreateWithoutLearningSessionChatsInput>
    connectOrCreate?: LearningSessionOutlineCreateOrConnectWithoutLearningSessionChatsInput
    upsert?: LearningSessionOutlineUpsertWithoutLearningSessionChatsInput
    disconnect?: LearningSessionOutlineWhereInput | boolean
    delete?: LearningSessionOutlineWhereInput | boolean
    connect?: LearningSessionOutlineWhereUniqueInput
    update?: XOR<XOR<LearningSessionOutlineUpdateToOneWithWhereWithoutLearningSessionChatsInput, LearningSessionOutlineUpdateWithoutLearningSessionChatsInput>, LearningSessionOutlineUncheckedUpdateWithoutLearningSessionChatsInput>
  }

  export type LearningJourneyStepUpdateOneWithoutChatsNestedInput = {
    create?: XOR<LearningJourneyStepCreateWithoutChatsInput, LearningJourneyStepUncheckedCreateWithoutChatsInput>
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutChatsInput
    upsert?: LearningJourneyStepUpsertWithoutChatsInput
    disconnect?: LearningJourneyStepWhereInput | boolean
    delete?: LearningJourneyStepWhereInput | boolean
    connect?: LearningJourneyStepWhereUniqueInput
    update?: XOR<XOR<LearningJourneyStepUpdateToOneWithWhereWithoutChatsInput, LearningJourneyStepUpdateWithoutChatsInput>, LearningJourneyStepUncheckedUpdateWithoutChatsInput>
  }

  export type MessageUpdateManyWithoutChatNestedInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutChatInput | MessageUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutChatInput | MessageUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutChatInput | MessageUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type MessageUncheckedUpdateManyWithoutChatNestedInput = {
    create?: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput> | MessageCreateWithoutChatInput[] | MessageUncheckedCreateWithoutChatInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutChatInput | MessageCreateOrConnectWithoutChatInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutChatInput | MessageUpsertWithWhereUniqueWithoutChatInput[]
    createMany?: MessageCreateManyChatInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutChatInput | MessageUpdateWithWhereUniqueWithoutChatInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutChatInput | MessageUpdateManyWithWhereWithoutChatInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type LearningSessionChatCreateNestedOneWithoutMessagesInput = {
    create?: XOR<LearningSessionChatCreateWithoutMessagesInput, LearningSessionChatUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutMessagesInput
    connect?: LearningSessionChatWhereUniqueInput
  }

  export type LearningSessionChatUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<LearningSessionChatCreateWithoutMessagesInput, LearningSessionChatUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutMessagesInput
    upsert?: LearningSessionChatUpsertWithoutMessagesInput
    connect?: LearningSessionChatWhereUniqueInput
    update?: XOR<XOR<LearningSessionChatUpdateToOneWithWhereWithoutMessagesInput, LearningSessionChatUpdateWithoutMessagesInput>, LearningSessionChatUncheckedUpdateWithoutMessagesInput>
  }

  export type UserCreateNestedOneWithoutJourneysInput = {
    create?: XOR<UserCreateWithoutJourneysInput, UserUncheckedCreateWithoutJourneysInput>
    connectOrCreate?: UserCreateOrConnectWithoutJourneysInput
    connect?: UserWhereUniqueInput
  }

  export type LearningJourneyStepCreateNestedManyWithoutJourneyInput = {
    create?: XOR<LearningJourneyStepCreateWithoutJourneyInput, LearningJourneyStepUncheckedCreateWithoutJourneyInput> | LearningJourneyStepCreateWithoutJourneyInput[] | LearningJourneyStepUncheckedCreateWithoutJourneyInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutJourneyInput | LearningJourneyStepCreateOrConnectWithoutJourneyInput[]
    createMany?: LearningJourneyStepCreateManyJourneyInputEnvelope
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
  }

  export type LearningJourneyStepUncheckedCreateNestedManyWithoutJourneyInput = {
    create?: XOR<LearningJourneyStepCreateWithoutJourneyInput, LearningJourneyStepUncheckedCreateWithoutJourneyInput> | LearningJourneyStepCreateWithoutJourneyInput[] | LearningJourneyStepUncheckedCreateWithoutJourneyInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutJourneyInput | LearningJourneyStepCreateOrConnectWithoutJourneyInput[]
    createMany?: LearningJourneyStepCreateManyJourneyInputEnvelope
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneWithoutJourneysNestedInput = {
    create?: XOR<UserCreateWithoutJourneysInput, UserUncheckedCreateWithoutJourneysInput>
    connectOrCreate?: UserCreateOrConnectWithoutJourneysInput
    upsert?: UserUpsertWithoutJourneysInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutJourneysInput, UserUpdateWithoutJourneysInput>, UserUncheckedUpdateWithoutJourneysInput>
  }

  export type LearningJourneyStepUpdateManyWithoutJourneyNestedInput = {
    create?: XOR<LearningJourneyStepCreateWithoutJourneyInput, LearningJourneyStepUncheckedCreateWithoutJourneyInput> | LearningJourneyStepCreateWithoutJourneyInput[] | LearningJourneyStepUncheckedCreateWithoutJourneyInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutJourneyInput | LearningJourneyStepCreateOrConnectWithoutJourneyInput[]
    upsert?: LearningJourneyStepUpsertWithWhereUniqueWithoutJourneyInput | LearningJourneyStepUpsertWithWhereUniqueWithoutJourneyInput[]
    createMany?: LearningJourneyStepCreateManyJourneyInputEnvelope
    set?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    disconnect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    delete?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    update?: LearningJourneyStepUpdateWithWhereUniqueWithoutJourneyInput | LearningJourneyStepUpdateWithWhereUniqueWithoutJourneyInput[]
    updateMany?: LearningJourneyStepUpdateManyWithWhereWithoutJourneyInput | LearningJourneyStepUpdateManyWithWhereWithoutJourneyInput[]
    deleteMany?: LearningJourneyStepScalarWhereInput | LearningJourneyStepScalarWhereInput[]
  }

  export type LearningJourneyStepUncheckedUpdateManyWithoutJourneyNestedInput = {
    create?: XOR<LearningJourneyStepCreateWithoutJourneyInput, LearningJourneyStepUncheckedCreateWithoutJourneyInput> | LearningJourneyStepCreateWithoutJourneyInput[] | LearningJourneyStepUncheckedCreateWithoutJourneyInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutJourneyInput | LearningJourneyStepCreateOrConnectWithoutJourneyInput[]
    upsert?: LearningJourneyStepUpsertWithWhereUniqueWithoutJourneyInput | LearningJourneyStepUpsertWithWhereUniqueWithoutJourneyInput[]
    createMany?: LearningJourneyStepCreateManyJourneyInputEnvelope
    set?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    disconnect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    delete?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    update?: LearningJourneyStepUpdateWithWhereUniqueWithoutJourneyInput | LearningJourneyStepUpdateWithWhereUniqueWithoutJourneyInput[]
    updateMany?: LearningJourneyStepUpdateManyWithWhereWithoutJourneyInput | LearningJourneyStepUpdateManyWithWhereWithoutJourneyInput[]
    deleteMany?: LearningJourneyStepScalarWhereInput | LearningJourneyStepScalarWhereInput[]
  }

  export type LearningJourneyStepCreateNestedManyWithoutSessionOutlineInput = {
    create?: XOR<LearningJourneyStepCreateWithoutSessionOutlineInput, LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput> | LearningJourneyStepCreateWithoutSessionOutlineInput[] | LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput | LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput[]
    createMany?: LearningJourneyStepCreateManySessionOutlineInputEnvelope
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
  }

  export type LearningSessionChatCreateNestedManyWithoutSessionOutlineInput = {
    create?: XOR<LearningSessionChatCreateWithoutSessionOutlineInput, LearningSessionChatUncheckedCreateWithoutSessionOutlineInput> | LearningSessionChatCreateWithoutSessionOutlineInput[] | LearningSessionChatUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutSessionOutlineInput | LearningSessionChatCreateOrConnectWithoutSessionOutlineInput[]
    createMany?: LearningSessionChatCreateManySessionOutlineInputEnvelope
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
  }

  export type LearningJourneyStepUncheckedCreateNestedManyWithoutSessionOutlineInput = {
    create?: XOR<LearningJourneyStepCreateWithoutSessionOutlineInput, LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput> | LearningJourneyStepCreateWithoutSessionOutlineInput[] | LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput | LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput[]
    createMany?: LearningJourneyStepCreateManySessionOutlineInputEnvelope
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
  }

  export type LearningSessionChatUncheckedCreateNestedManyWithoutSessionOutlineInput = {
    create?: XOR<LearningSessionChatCreateWithoutSessionOutlineInput, LearningSessionChatUncheckedCreateWithoutSessionOutlineInput> | LearningSessionChatCreateWithoutSessionOutlineInput[] | LearningSessionChatUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutSessionOutlineInput | LearningSessionChatCreateOrConnectWithoutSessionOutlineInput[]
    createMany?: LearningSessionChatCreateManySessionOutlineInputEnvelope
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LearningJourneyStepUpdateManyWithoutSessionOutlineNestedInput = {
    create?: XOR<LearningJourneyStepCreateWithoutSessionOutlineInput, LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput> | LearningJourneyStepCreateWithoutSessionOutlineInput[] | LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput | LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput[]
    upsert?: LearningJourneyStepUpsertWithWhereUniqueWithoutSessionOutlineInput | LearningJourneyStepUpsertWithWhereUniqueWithoutSessionOutlineInput[]
    createMany?: LearningJourneyStepCreateManySessionOutlineInputEnvelope
    set?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    disconnect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    delete?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    update?: LearningJourneyStepUpdateWithWhereUniqueWithoutSessionOutlineInput | LearningJourneyStepUpdateWithWhereUniqueWithoutSessionOutlineInput[]
    updateMany?: LearningJourneyStepUpdateManyWithWhereWithoutSessionOutlineInput | LearningJourneyStepUpdateManyWithWhereWithoutSessionOutlineInput[]
    deleteMany?: LearningJourneyStepScalarWhereInput | LearningJourneyStepScalarWhereInput[]
  }

  export type LearningSessionChatUpdateManyWithoutSessionOutlineNestedInput = {
    create?: XOR<LearningSessionChatCreateWithoutSessionOutlineInput, LearningSessionChatUncheckedCreateWithoutSessionOutlineInput> | LearningSessionChatCreateWithoutSessionOutlineInput[] | LearningSessionChatUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutSessionOutlineInput | LearningSessionChatCreateOrConnectWithoutSessionOutlineInput[]
    upsert?: LearningSessionChatUpsertWithWhereUniqueWithoutSessionOutlineInput | LearningSessionChatUpsertWithWhereUniqueWithoutSessionOutlineInput[]
    createMany?: LearningSessionChatCreateManySessionOutlineInputEnvelope
    set?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    disconnect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    delete?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    update?: LearningSessionChatUpdateWithWhereUniqueWithoutSessionOutlineInput | LearningSessionChatUpdateWithWhereUniqueWithoutSessionOutlineInput[]
    updateMany?: LearningSessionChatUpdateManyWithWhereWithoutSessionOutlineInput | LearningSessionChatUpdateManyWithWhereWithoutSessionOutlineInput[]
    deleteMany?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
  }

  export type LearningJourneyStepUncheckedUpdateManyWithoutSessionOutlineNestedInput = {
    create?: XOR<LearningJourneyStepCreateWithoutSessionOutlineInput, LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput> | LearningJourneyStepCreateWithoutSessionOutlineInput[] | LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput | LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput[]
    upsert?: LearningJourneyStepUpsertWithWhereUniqueWithoutSessionOutlineInput | LearningJourneyStepUpsertWithWhereUniqueWithoutSessionOutlineInput[]
    createMany?: LearningJourneyStepCreateManySessionOutlineInputEnvelope
    set?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    disconnect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    delete?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    connect?: LearningJourneyStepWhereUniqueInput | LearningJourneyStepWhereUniqueInput[]
    update?: LearningJourneyStepUpdateWithWhereUniqueWithoutSessionOutlineInput | LearningJourneyStepUpdateWithWhereUniqueWithoutSessionOutlineInput[]
    updateMany?: LearningJourneyStepUpdateManyWithWhereWithoutSessionOutlineInput | LearningJourneyStepUpdateManyWithWhereWithoutSessionOutlineInput[]
    deleteMany?: LearningJourneyStepScalarWhereInput | LearningJourneyStepScalarWhereInput[]
  }

  export type LearningSessionChatUncheckedUpdateManyWithoutSessionOutlineNestedInput = {
    create?: XOR<LearningSessionChatCreateWithoutSessionOutlineInput, LearningSessionChatUncheckedCreateWithoutSessionOutlineInput> | LearningSessionChatCreateWithoutSessionOutlineInput[] | LearningSessionChatUncheckedCreateWithoutSessionOutlineInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutSessionOutlineInput | LearningSessionChatCreateOrConnectWithoutSessionOutlineInput[]
    upsert?: LearningSessionChatUpsertWithWhereUniqueWithoutSessionOutlineInput | LearningSessionChatUpsertWithWhereUniqueWithoutSessionOutlineInput[]
    createMany?: LearningSessionChatCreateManySessionOutlineInputEnvelope
    set?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    disconnect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    delete?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    update?: LearningSessionChatUpdateWithWhereUniqueWithoutSessionOutlineInput | LearningSessionChatUpdateWithWhereUniqueWithoutSessionOutlineInput[]
    updateMany?: LearningSessionChatUpdateManyWithWhereWithoutSessionOutlineInput | LearningSessionChatUpdateManyWithWhereWithoutSessionOutlineInput[]
    deleteMany?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
  }

  export type LearningJourneyCreateNestedOneWithoutStepsInput = {
    create?: XOR<LearningJourneyCreateWithoutStepsInput, LearningJourneyUncheckedCreateWithoutStepsInput>
    connectOrCreate?: LearningJourneyCreateOrConnectWithoutStepsInput
    connect?: LearningJourneyWhereUniqueInput
  }

  export type LearningSessionOutlineCreateNestedOneWithoutStepsInput = {
    create?: XOR<LearningSessionOutlineCreateWithoutStepsInput, LearningSessionOutlineUncheckedCreateWithoutStepsInput>
    connectOrCreate?: LearningSessionOutlineCreateOrConnectWithoutStepsInput
    connect?: LearningSessionOutlineWhereUniqueInput
  }

  export type LearningSessionChatCreateNestedManyWithoutStepInput = {
    create?: XOR<LearningSessionChatCreateWithoutStepInput, LearningSessionChatUncheckedCreateWithoutStepInput> | LearningSessionChatCreateWithoutStepInput[] | LearningSessionChatUncheckedCreateWithoutStepInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutStepInput | LearningSessionChatCreateOrConnectWithoutStepInput[]
    createMany?: LearningSessionChatCreateManyStepInputEnvelope
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
  }

  export type LearningSessionChatUncheckedCreateNestedManyWithoutStepInput = {
    create?: XOR<LearningSessionChatCreateWithoutStepInput, LearningSessionChatUncheckedCreateWithoutStepInput> | LearningSessionChatCreateWithoutStepInput[] | LearningSessionChatUncheckedCreateWithoutStepInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutStepInput | LearningSessionChatCreateOrConnectWithoutStepInput[]
    createMany?: LearningSessionChatCreateManyStepInputEnvelope
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
  }

  export type LearningJourneyUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<LearningJourneyCreateWithoutStepsInput, LearningJourneyUncheckedCreateWithoutStepsInput>
    connectOrCreate?: LearningJourneyCreateOrConnectWithoutStepsInput
    upsert?: LearningJourneyUpsertWithoutStepsInput
    connect?: LearningJourneyWhereUniqueInput
    update?: XOR<XOR<LearningJourneyUpdateToOneWithWhereWithoutStepsInput, LearningJourneyUpdateWithoutStepsInput>, LearningJourneyUncheckedUpdateWithoutStepsInput>
  }

  export type LearningSessionOutlineUpdateOneRequiredWithoutStepsNestedInput = {
    create?: XOR<LearningSessionOutlineCreateWithoutStepsInput, LearningSessionOutlineUncheckedCreateWithoutStepsInput>
    connectOrCreate?: LearningSessionOutlineCreateOrConnectWithoutStepsInput
    upsert?: LearningSessionOutlineUpsertWithoutStepsInput
    connect?: LearningSessionOutlineWhereUniqueInput
    update?: XOR<XOR<LearningSessionOutlineUpdateToOneWithWhereWithoutStepsInput, LearningSessionOutlineUpdateWithoutStepsInput>, LearningSessionOutlineUncheckedUpdateWithoutStepsInput>
  }

  export type LearningSessionChatUpdateManyWithoutStepNestedInput = {
    create?: XOR<LearningSessionChatCreateWithoutStepInput, LearningSessionChatUncheckedCreateWithoutStepInput> | LearningSessionChatCreateWithoutStepInput[] | LearningSessionChatUncheckedCreateWithoutStepInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutStepInput | LearningSessionChatCreateOrConnectWithoutStepInput[]
    upsert?: LearningSessionChatUpsertWithWhereUniqueWithoutStepInput | LearningSessionChatUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: LearningSessionChatCreateManyStepInputEnvelope
    set?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    disconnect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    delete?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    update?: LearningSessionChatUpdateWithWhereUniqueWithoutStepInput | LearningSessionChatUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: LearningSessionChatUpdateManyWithWhereWithoutStepInput | LearningSessionChatUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
  }

  export type LearningSessionChatUncheckedUpdateManyWithoutStepNestedInput = {
    create?: XOR<LearningSessionChatCreateWithoutStepInput, LearningSessionChatUncheckedCreateWithoutStepInput> | LearningSessionChatCreateWithoutStepInput[] | LearningSessionChatUncheckedCreateWithoutStepInput[]
    connectOrCreate?: LearningSessionChatCreateOrConnectWithoutStepInput | LearningSessionChatCreateOrConnectWithoutStepInput[]
    upsert?: LearningSessionChatUpsertWithWhereUniqueWithoutStepInput | LearningSessionChatUpsertWithWhereUniqueWithoutStepInput[]
    createMany?: LearningSessionChatCreateManyStepInputEnvelope
    set?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    disconnect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    delete?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    connect?: LearningSessionChatWhereUniqueInput | LearningSessionChatWhereUniqueInput[]
    update?: LearningSessionChatUpdateWithWhereUniqueWithoutStepInput | LearningSessionChatUpdateWithWhereUniqueWithoutStepInput[]
    updateMany?: LearningSessionChatUpdateManyWithWhereWithoutStepInput | LearningSessionChatUpdateManyWithWhereWithoutStepInput[]
    deleteMany?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumGoalStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusFilter<$PrismaModel> | $Enums.GoalStatus
  }

  export type NestedEnumGoalStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GoalStatus | EnumGoalStatusFieldRefInput<$PrismaModel>
    in?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.GoalStatus[] | ListEnumGoalStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumGoalStatusWithAggregatesFilter<$PrismaModel> | $Enums.GoalStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGoalStatusFilter<$PrismaModel>
    _max?: NestedEnumGoalStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type LearningSessionChatCreateWithoutUserInput = {
    id?: string
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sessionOutline?: LearningSessionOutlineCreateNestedOneWithoutLearningSessionChatsInput
    step?: LearningJourneyStepCreateNestedOneWithoutChatsInput
    messages?: MessageCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatUncheckedCreateWithoutUserInput = {
    id?: string
    sessionOutlineId?: string | null
    stepId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatCreateOrConnectWithoutUserInput = {
    where: LearningSessionChatWhereUniqueInput
    create: XOR<LearningSessionChatCreateWithoutUserInput, LearningSessionChatUncheckedCreateWithoutUserInput>
  }

  export type LearningSessionChatCreateManyUserInputEnvelope = {
    data: LearningSessionChatCreateManyUserInput | LearningSessionChatCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LearningJourneyCreateWithoutPersonalizedForUserInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: LearningJourneyStepCreateNestedManyWithoutJourneyInput
  }

  export type LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: LearningJourneyStepUncheckedCreateNestedManyWithoutJourneyInput
  }

  export type LearningJourneyCreateOrConnectWithoutPersonalizedForUserInput = {
    where: LearningJourneyWhereUniqueInput
    create: XOR<LearningJourneyCreateWithoutPersonalizedForUserInput, LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput>
  }

  export type LearningJourneyCreateManyPersonalizedForUserInputEnvelope = {
    data: LearningJourneyCreateManyPersonalizedForUserInput | LearningJourneyCreateManyPersonalizedForUserInput[]
    skipDuplicates?: boolean
  }

  export type UserGoalCreateWithoutUserInput = {
    id?: string
    statement: string
    status?: $Enums.GoalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGoalUncheckedCreateWithoutUserInput = {
    id?: string
    statement: string
    status?: $Enums.GoalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGoalCreateOrConnectWithoutUserInput = {
    where: UserGoalWhereUniqueInput
    create: XOR<UserGoalCreateWithoutUserInput, UserGoalUncheckedCreateWithoutUserInput>
  }

  export type UserGoalCreateManyUserInputEnvelope = {
    data: UserGoalCreateManyUserInput | UserGoalCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type LearningSessionChatUpsertWithWhereUniqueWithoutUserInput = {
    where: LearningSessionChatWhereUniqueInput
    update: XOR<LearningSessionChatUpdateWithoutUserInput, LearningSessionChatUncheckedUpdateWithoutUserInput>
    create: XOR<LearningSessionChatCreateWithoutUserInput, LearningSessionChatUncheckedCreateWithoutUserInput>
  }

  export type LearningSessionChatUpdateWithWhereUniqueWithoutUserInput = {
    where: LearningSessionChatWhereUniqueInput
    data: XOR<LearningSessionChatUpdateWithoutUserInput, LearningSessionChatUncheckedUpdateWithoutUserInput>
  }

  export type LearningSessionChatUpdateManyWithWhereWithoutUserInput = {
    where: LearningSessionChatScalarWhereInput
    data: XOR<LearningSessionChatUpdateManyMutationInput, LearningSessionChatUncheckedUpdateManyWithoutUserInput>
  }

  export type LearningSessionChatScalarWhereInput = {
    AND?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
    OR?: LearningSessionChatScalarWhereInput[]
    NOT?: LearningSessionChatScalarWhereInput | LearningSessionChatScalarWhereInput[]
    id?: StringFilter<"LearningSessionChat"> | string
    userId?: StringNullableFilter<"LearningSessionChat"> | string | null
    sessionOutlineId?: StringNullableFilter<"LearningSessionChat"> | string | null
    stepId?: StringNullableFilter<"LearningSessionChat"> | string | null
    sessionTitle?: StringNullableFilter<"LearningSessionChat"> | string | null
    startedAt?: DateTimeFilter<"LearningSessionChat"> | Date | string
    endedAt?: DateTimeNullableFilter<"LearningSessionChat"> | Date | string | null
    lastMessageAt?: DateTimeNullableFilter<"LearningSessionChat"> | Date | string | null
    metadata?: JsonNullableFilter<"LearningSessionChat">
  }

  export type LearningJourneyUpsertWithWhereUniqueWithoutPersonalizedForUserInput = {
    where: LearningJourneyWhereUniqueInput
    update: XOR<LearningJourneyUpdateWithoutPersonalizedForUserInput, LearningJourneyUncheckedUpdateWithoutPersonalizedForUserInput>
    create: XOR<LearningJourneyCreateWithoutPersonalizedForUserInput, LearningJourneyUncheckedCreateWithoutPersonalizedForUserInput>
  }

  export type LearningJourneyUpdateWithWhereUniqueWithoutPersonalizedForUserInput = {
    where: LearningJourneyWhereUniqueInput
    data: XOR<LearningJourneyUpdateWithoutPersonalizedForUserInput, LearningJourneyUncheckedUpdateWithoutPersonalizedForUserInput>
  }

  export type LearningJourneyUpdateManyWithWhereWithoutPersonalizedForUserInput = {
    where: LearningJourneyScalarWhereInput
    data: XOR<LearningJourneyUpdateManyMutationInput, LearningJourneyUncheckedUpdateManyWithoutPersonalizedForUserInput>
  }

  export type LearningJourneyScalarWhereInput = {
    AND?: LearningJourneyScalarWhereInput | LearningJourneyScalarWhereInput[]
    OR?: LearningJourneyScalarWhereInput[]
    NOT?: LearningJourneyScalarWhereInput | LearningJourneyScalarWhereInput[]
    id?: StringFilter<"LearningJourney"> | string
    slug?: StringNullableFilter<"LearningJourney"> | string | null
    order?: IntNullableFilter<"LearningJourney"> | number | null
    title?: StringFilter<"LearningJourney"> | string
    intro?: StringNullableFilter<"LearningJourney"> | string | null
    objectives?: JsonNullableFilter<"LearningJourney">
    isStandard?: BoolFilter<"LearningJourney"> | boolean
    personalizedForUserId?: StringNullableFilter<"LearningJourney"> | string | null
    userGoalSummary?: StringNullableFilter<"LearningJourney"> | string | null
    goalChatId?: StringNullableFilter<"LearningJourney"> | string | null
    status?: StringFilter<"LearningJourney"> | string
    createdAt?: DateTimeFilter<"LearningJourney"> | Date | string
    updatedAt?: DateTimeFilter<"LearningJourney"> | Date | string
  }

  export type UserGoalUpsertWithWhereUniqueWithoutUserInput = {
    where: UserGoalWhereUniqueInput
    update: XOR<UserGoalUpdateWithoutUserInput, UserGoalUncheckedUpdateWithoutUserInput>
    create: XOR<UserGoalCreateWithoutUserInput, UserGoalUncheckedCreateWithoutUserInput>
  }

  export type UserGoalUpdateWithWhereUniqueWithoutUserInput = {
    where: UserGoalWhereUniqueInput
    data: XOR<UserGoalUpdateWithoutUserInput, UserGoalUncheckedUpdateWithoutUserInput>
  }

  export type UserGoalUpdateManyWithWhereWithoutUserInput = {
    where: UserGoalScalarWhereInput
    data: XOR<UserGoalUpdateManyMutationInput, UserGoalUncheckedUpdateManyWithoutUserInput>
  }

  export type UserGoalScalarWhereInput = {
    AND?: UserGoalScalarWhereInput | UserGoalScalarWhereInput[]
    OR?: UserGoalScalarWhereInput[]
    NOT?: UserGoalScalarWhereInput | UserGoalScalarWhereInput[]
    id?: StringFilter<"UserGoal"> | string
    userId?: StringFilter<"UserGoal"> | string
    statement?: StringFilter<"UserGoal"> | string
    status?: EnumGoalStatusFilter<"UserGoal"> | $Enums.GoalStatus
    createdAt?: DateTimeFilter<"UserGoal"> | Date | string
    updatedAt?: DateTimeFilter<"UserGoal"> | Date | string
  }

  export type UserCreateWithoutGoalsInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatCreateNestedManyWithoutUserInput
    journeys?: LearningJourneyCreateNestedManyWithoutPersonalizedForUserInput
  }

  export type UserUncheckedCreateWithoutGoalsInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatUncheckedCreateNestedManyWithoutUserInput
    journeys?: LearningJourneyUncheckedCreateNestedManyWithoutPersonalizedForUserInput
  }

  export type UserCreateOrConnectWithoutGoalsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
  }

  export type UserUpsertWithoutGoalsInput = {
    update: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
    create: XOR<UserCreateWithoutGoalsInput, UserUncheckedCreateWithoutGoalsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutGoalsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutGoalsInput, UserUncheckedUpdateWithoutGoalsInput>
  }

  export type UserUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUpdateManyWithoutUserNestedInput
    journeys?: LearningJourneyUpdateManyWithoutPersonalizedForUserNestedInput
  }

  export type UserUncheckedUpdateWithoutGoalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUncheckedUpdateManyWithoutUserNestedInput
    journeys?: LearningJourneyUncheckedUpdateManyWithoutPersonalizedForUserNestedInput
  }

  export type UserCreateWithoutChatsInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    journeys?: LearningJourneyCreateNestedManyWithoutPersonalizedForUserInput
    goals?: UserGoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutChatsInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    journeys?: LearningJourneyUncheckedCreateNestedManyWithoutPersonalizedForUserInput
    goals?: UserGoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutChatsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
  }

  export type LearningSessionOutlineCreateWithoutLearningSessionChatsInput = {
    id?: string
    slug: string
    order: number
    title: string
    objective?: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: LearningJourneyStepCreateNestedManyWithoutSessionOutlineInput
  }

  export type LearningSessionOutlineUncheckedCreateWithoutLearningSessionChatsInput = {
    id?: string
    slug: string
    order: number
    title: string
    objective?: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    steps?: LearningJourneyStepUncheckedCreateNestedManyWithoutSessionOutlineInput
  }

  export type LearningSessionOutlineCreateOrConnectWithoutLearningSessionChatsInput = {
    where: LearningSessionOutlineWhereUniqueInput
    create: XOR<LearningSessionOutlineCreateWithoutLearningSessionChatsInput, LearningSessionOutlineUncheckedCreateWithoutLearningSessionChatsInput>
  }

  export type LearningJourneyStepCreateWithoutChatsInput = {
    id?: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journey: LearningJourneyCreateNestedOneWithoutStepsInput
    sessionOutline: LearningSessionOutlineCreateNestedOneWithoutStepsInput
  }

  export type LearningJourneyStepUncheckedCreateWithoutChatsInput = {
    id?: string
    journeyId: string
    sessionOutlineId: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningJourneyStepCreateOrConnectWithoutChatsInput = {
    where: LearningJourneyStepWhereUniqueInput
    create: XOR<LearningJourneyStepCreateWithoutChatsInput, LearningJourneyStepUncheckedCreateWithoutChatsInput>
  }

  export type MessageCreateWithoutChatInput = {
    id?: string
    role: string
    content: string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutChatInput = {
    id?: string
    role: string
    content: string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutChatInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput>
  }

  export type MessageCreateManyChatInputEnvelope = {
    data: MessageCreateManyChatInput | MessageCreateManyChatInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutChatsInput = {
    update: XOR<UserUpdateWithoutChatsInput, UserUncheckedUpdateWithoutChatsInput>
    create: XOR<UserCreateWithoutChatsInput, UserUncheckedCreateWithoutChatsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutChatsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutChatsInput, UserUncheckedUpdateWithoutChatsInput>
  }

  export type UserUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journeys?: LearningJourneyUpdateManyWithoutPersonalizedForUserNestedInput
    goals?: UserGoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journeys?: LearningJourneyUncheckedUpdateManyWithoutPersonalizedForUserNestedInput
    goals?: UserGoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LearningSessionOutlineUpsertWithoutLearningSessionChatsInput = {
    update: XOR<LearningSessionOutlineUpdateWithoutLearningSessionChatsInput, LearningSessionOutlineUncheckedUpdateWithoutLearningSessionChatsInput>
    create: XOR<LearningSessionOutlineCreateWithoutLearningSessionChatsInput, LearningSessionOutlineUncheckedCreateWithoutLearningSessionChatsInput>
    where?: LearningSessionOutlineWhereInput
  }

  export type LearningSessionOutlineUpdateToOneWithWhereWithoutLearningSessionChatsInput = {
    where?: LearningSessionOutlineWhereInput
    data: XOR<LearningSessionOutlineUpdateWithoutLearningSessionChatsInput, LearningSessionOutlineUncheckedUpdateWithoutLearningSessionChatsInput>
  }

  export type LearningSessionOutlineUpdateWithoutLearningSessionChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: LearningJourneyStepUpdateManyWithoutSessionOutlineNestedInput
  }

  export type LearningSessionOutlineUncheckedUpdateWithoutLearningSessionChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: LearningJourneyStepUncheckedUpdateManyWithoutSessionOutlineNestedInput
  }

  export type LearningJourneyStepUpsertWithoutChatsInput = {
    update: XOR<LearningJourneyStepUpdateWithoutChatsInput, LearningJourneyStepUncheckedUpdateWithoutChatsInput>
    create: XOR<LearningJourneyStepCreateWithoutChatsInput, LearningJourneyStepUncheckedCreateWithoutChatsInput>
    where?: LearningJourneyStepWhereInput
  }

  export type LearningJourneyStepUpdateToOneWithWhereWithoutChatsInput = {
    where?: LearningJourneyStepWhereInput
    data: XOR<LearningJourneyStepUpdateWithoutChatsInput, LearningJourneyStepUncheckedUpdateWithoutChatsInput>
  }

  export type LearningJourneyStepUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journey?: LearningJourneyUpdateOneRequiredWithoutStepsNestedInput
    sessionOutline?: LearningSessionOutlineUpdateOneRequiredWithoutStepsNestedInput
  }

  export type LearningJourneyStepUncheckedUpdateWithoutChatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    journeyId?: StringFieldUpdateOperationsInput | string
    sessionOutlineId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutChatInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutChatInput, MessageUncheckedUpdateWithoutChatInput>
    create: XOR<MessageCreateWithoutChatInput, MessageUncheckedCreateWithoutChatInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutChatInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutChatInput, MessageUncheckedUpdateWithoutChatInput>
  }

  export type MessageUpdateManyWithWhereWithoutChatInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutChatInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    chatId?: StringFilter<"Message"> | string
    role?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    command?: JsonNullableFilter<"Message">
    createdAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type LearningSessionChatCreateWithoutMessagesInput = {
    id?: string
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserCreateNestedOneWithoutChatsInput
    sessionOutline?: LearningSessionOutlineCreateNestedOneWithoutLearningSessionChatsInput
    step?: LearningJourneyStepCreateNestedOneWithoutChatsInput
  }

  export type LearningSessionChatUncheckedCreateWithoutMessagesInput = {
    id?: string
    userId?: string | null
    sessionOutlineId?: string | null
    stepId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningSessionChatCreateOrConnectWithoutMessagesInput = {
    where: LearningSessionChatWhereUniqueInput
    create: XOR<LearningSessionChatCreateWithoutMessagesInput, LearningSessionChatUncheckedCreateWithoutMessagesInput>
  }

  export type LearningSessionChatUpsertWithoutMessagesInput = {
    update: XOR<LearningSessionChatUpdateWithoutMessagesInput, LearningSessionChatUncheckedUpdateWithoutMessagesInput>
    create: XOR<LearningSessionChatCreateWithoutMessagesInput, LearningSessionChatUncheckedCreateWithoutMessagesInput>
    where?: LearningSessionChatWhereInput
  }

  export type LearningSessionChatUpdateToOneWithWhereWithoutMessagesInput = {
    where?: LearningSessionChatWhereInput
    data: XOR<LearningSessionChatUpdateWithoutMessagesInput, LearningSessionChatUncheckedUpdateWithoutMessagesInput>
  }

  export type LearningSessionChatUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneWithoutChatsNestedInput
    sessionOutline?: LearningSessionOutlineUpdateOneWithoutLearningSessionChatsNestedInput
    step?: LearningJourneyStepUpdateOneWithoutChatsNestedInput
  }

  export type LearningSessionChatUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionOutlineId?: NullableStringFieldUpdateOperationsInput | string | null
    stepId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type UserCreateWithoutJourneysInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatCreateNestedManyWithoutUserInput
    goals?: UserGoalCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutJourneysInput = {
    id?: string
    name?: string | null
    email?: string | null
    phone?: string | null
    passwordHash: string
    picture?: string | null
    role: string
    botRole: string
    profileTour?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatUncheckedCreateNestedManyWithoutUserInput
    goals?: UserGoalUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutJourneysInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutJourneysInput, UserUncheckedCreateWithoutJourneysInput>
  }

  export type LearningJourneyStepCreateWithoutJourneyInput = {
    id?: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessionOutline: LearningSessionOutlineCreateNestedOneWithoutStepsInput
    chats?: LearningSessionChatCreateNestedManyWithoutStepInput
  }

  export type LearningJourneyStepUncheckedCreateWithoutJourneyInput = {
    id?: string
    sessionOutlineId: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatUncheckedCreateNestedManyWithoutStepInput
  }

  export type LearningJourneyStepCreateOrConnectWithoutJourneyInput = {
    where: LearningJourneyStepWhereUniqueInput
    create: XOR<LearningJourneyStepCreateWithoutJourneyInput, LearningJourneyStepUncheckedCreateWithoutJourneyInput>
  }

  export type LearningJourneyStepCreateManyJourneyInputEnvelope = {
    data: LearningJourneyStepCreateManyJourneyInput | LearningJourneyStepCreateManyJourneyInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutJourneysInput = {
    update: XOR<UserUpdateWithoutJourneysInput, UserUncheckedUpdateWithoutJourneysInput>
    create: XOR<UserCreateWithoutJourneysInput, UserUncheckedCreateWithoutJourneysInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutJourneysInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutJourneysInput, UserUncheckedUpdateWithoutJourneysInput>
  }

  export type UserUpdateWithoutJourneysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUpdateManyWithoutUserNestedInput
    goals?: UserGoalUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutJourneysInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    passwordHash?: StringFieldUpdateOperationsInput | string
    picture?: NullableStringFieldUpdateOperationsInput | string | null
    role?: StringFieldUpdateOperationsInput | string
    botRole?: StringFieldUpdateOperationsInput | string
    profileTour?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUncheckedUpdateManyWithoutUserNestedInput
    goals?: UserGoalUncheckedUpdateManyWithoutUserNestedInput
  }

  export type LearningJourneyStepUpsertWithWhereUniqueWithoutJourneyInput = {
    where: LearningJourneyStepWhereUniqueInput
    update: XOR<LearningJourneyStepUpdateWithoutJourneyInput, LearningJourneyStepUncheckedUpdateWithoutJourneyInput>
    create: XOR<LearningJourneyStepCreateWithoutJourneyInput, LearningJourneyStepUncheckedCreateWithoutJourneyInput>
  }

  export type LearningJourneyStepUpdateWithWhereUniqueWithoutJourneyInput = {
    where: LearningJourneyStepWhereUniqueInput
    data: XOR<LearningJourneyStepUpdateWithoutJourneyInput, LearningJourneyStepUncheckedUpdateWithoutJourneyInput>
  }

  export type LearningJourneyStepUpdateManyWithWhereWithoutJourneyInput = {
    where: LearningJourneyStepScalarWhereInput
    data: XOR<LearningJourneyStepUpdateManyMutationInput, LearningJourneyStepUncheckedUpdateManyWithoutJourneyInput>
  }

  export type LearningJourneyStepScalarWhereInput = {
    AND?: LearningJourneyStepScalarWhereInput | LearningJourneyStepScalarWhereInput[]
    OR?: LearningJourneyStepScalarWhereInput[]
    NOT?: LearningJourneyStepScalarWhereInput | LearningJourneyStepScalarWhereInput[]
    id?: StringFilter<"LearningJourneyStep"> | string
    journeyId?: StringFilter<"LearningJourneyStep"> | string
    sessionOutlineId?: StringFilter<"LearningJourneyStep"> | string
    order?: IntFilter<"LearningJourneyStep"> | number
    status?: StringFilter<"LearningJourneyStep"> | string
    ahaText?: StringNullableFilter<"LearningJourneyStep"> | string | null
    unlockedAt?: DateTimeNullableFilter<"LearningJourneyStep"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"LearningJourneyStep"> | Date | string | null
    createdAt?: DateTimeFilter<"LearningJourneyStep"> | Date | string
    updatedAt?: DateTimeFilter<"LearningJourneyStep"> | Date | string
  }

  export type LearningJourneyStepCreateWithoutSessionOutlineInput = {
    id?: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    journey: LearningJourneyCreateNestedOneWithoutStepsInput
    chats?: LearningSessionChatCreateNestedManyWithoutStepInput
  }

  export type LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput = {
    id?: string
    journeyId: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    chats?: LearningSessionChatUncheckedCreateNestedManyWithoutStepInput
  }

  export type LearningJourneyStepCreateOrConnectWithoutSessionOutlineInput = {
    where: LearningJourneyStepWhereUniqueInput
    create: XOR<LearningJourneyStepCreateWithoutSessionOutlineInput, LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput>
  }

  export type LearningJourneyStepCreateManySessionOutlineInputEnvelope = {
    data: LearningJourneyStepCreateManySessionOutlineInput | LearningJourneyStepCreateManySessionOutlineInput[]
    skipDuplicates?: boolean
  }

  export type LearningSessionChatCreateWithoutSessionOutlineInput = {
    id?: string
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserCreateNestedOneWithoutChatsInput
    step?: LearningJourneyStepCreateNestedOneWithoutChatsInput
    messages?: MessageCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatUncheckedCreateWithoutSessionOutlineInput = {
    id?: string
    userId?: string | null
    stepId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatCreateOrConnectWithoutSessionOutlineInput = {
    where: LearningSessionChatWhereUniqueInput
    create: XOR<LearningSessionChatCreateWithoutSessionOutlineInput, LearningSessionChatUncheckedCreateWithoutSessionOutlineInput>
  }

  export type LearningSessionChatCreateManySessionOutlineInputEnvelope = {
    data: LearningSessionChatCreateManySessionOutlineInput | LearningSessionChatCreateManySessionOutlineInput[]
    skipDuplicates?: boolean
  }

  export type LearningJourneyStepUpsertWithWhereUniqueWithoutSessionOutlineInput = {
    where: LearningJourneyStepWhereUniqueInput
    update: XOR<LearningJourneyStepUpdateWithoutSessionOutlineInput, LearningJourneyStepUncheckedUpdateWithoutSessionOutlineInput>
    create: XOR<LearningJourneyStepCreateWithoutSessionOutlineInput, LearningJourneyStepUncheckedCreateWithoutSessionOutlineInput>
  }

  export type LearningJourneyStepUpdateWithWhereUniqueWithoutSessionOutlineInput = {
    where: LearningJourneyStepWhereUniqueInput
    data: XOR<LearningJourneyStepUpdateWithoutSessionOutlineInput, LearningJourneyStepUncheckedUpdateWithoutSessionOutlineInput>
  }

  export type LearningJourneyStepUpdateManyWithWhereWithoutSessionOutlineInput = {
    where: LearningJourneyStepScalarWhereInput
    data: XOR<LearningJourneyStepUpdateManyMutationInput, LearningJourneyStepUncheckedUpdateManyWithoutSessionOutlineInput>
  }

  export type LearningSessionChatUpsertWithWhereUniqueWithoutSessionOutlineInput = {
    where: LearningSessionChatWhereUniqueInput
    update: XOR<LearningSessionChatUpdateWithoutSessionOutlineInput, LearningSessionChatUncheckedUpdateWithoutSessionOutlineInput>
    create: XOR<LearningSessionChatCreateWithoutSessionOutlineInput, LearningSessionChatUncheckedCreateWithoutSessionOutlineInput>
  }

  export type LearningSessionChatUpdateWithWhereUniqueWithoutSessionOutlineInput = {
    where: LearningSessionChatWhereUniqueInput
    data: XOR<LearningSessionChatUpdateWithoutSessionOutlineInput, LearningSessionChatUncheckedUpdateWithoutSessionOutlineInput>
  }

  export type LearningSessionChatUpdateManyWithWhereWithoutSessionOutlineInput = {
    where: LearningSessionChatScalarWhereInput
    data: XOR<LearningSessionChatUpdateManyMutationInput, LearningSessionChatUncheckedUpdateManyWithoutSessionOutlineInput>
  }

  export type LearningJourneyCreateWithoutStepsInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
    personalizedForUser?: UserCreateNestedOneWithoutJourneysInput
  }

  export type LearningJourneyUncheckedCreateWithoutStepsInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    personalizedForUserId?: string | null
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningJourneyCreateOrConnectWithoutStepsInput = {
    where: LearningJourneyWhereUniqueInput
    create: XOR<LearningJourneyCreateWithoutStepsInput, LearningJourneyUncheckedCreateWithoutStepsInput>
  }

  export type LearningSessionOutlineCreateWithoutStepsInput = {
    id?: string
    slug: string
    order: number
    title: string
    objective?: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    learningSessionChats?: LearningSessionChatCreateNestedManyWithoutSessionOutlineInput
  }

  export type LearningSessionOutlineUncheckedCreateWithoutStepsInput = {
    id?: string
    slug: string
    order: number
    title: string
    objective?: string | null
    content: string
    botTools: string
    firstUserMessage: string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    learningSessionChats?: LearningSessionChatUncheckedCreateNestedManyWithoutSessionOutlineInput
  }

  export type LearningSessionOutlineCreateOrConnectWithoutStepsInput = {
    where: LearningSessionOutlineWhereUniqueInput
    create: XOR<LearningSessionOutlineCreateWithoutStepsInput, LearningSessionOutlineUncheckedCreateWithoutStepsInput>
  }

  export type LearningSessionChatCreateWithoutStepInput = {
    id?: string
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserCreateNestedOneWithoutChatsInput
    sessionOutline?: LearningSessionOutlineCreateNestedOneWithoutLearningSessionChatsInput
    messages?: MessageCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatUncheckedCreateWithoutStepInput = {
    id?: string
    userId?: string | null
    sessionOutlineId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedCreateNestedManyWithoutChatInput
  }

  export type LearningSessionChatCreateOrConnectWithoutStepInput = {
    where: LearningSessionChatWhereUniqueInput
    create: XOR<LearningSessionChatCreateWithoutStepInput, LearningSessionChatUncheckedCreateWithoutStepInput>
  }

  export type LearningSessionChatCreateManyStepInputEnvelope = {
    data: LearningSessionChatCreateManyStepInput | LearningSessionChatCreateManyStepInput[]
    skipDuplicates?: boolean
  }

  export type LearningJourneyUpsertWithoutStepsInput = {
    update: XOR<LearningJourneyUpdateWithoutStepsInput, LearningJourneyUncheckedUpdateWithoutStepsInput>
    create: XOR<LearningJourneyCreateWithoutStepsInput, LearningJourneyUncheckedCreateWithoutStepsInput>
    where?: LearningJourneyWhereInput
  }

  export type LearningJourneyUpdateToOneWithWhereWithoutStepsInput = {
    where?: LearningJourneyWhereInput
    data: XOR<LearningJourneyUpdateWithoutStepsInput, LearningJourneyUncheckedUpdateWithoutStepsInput>
  }

  export type LearningJourneyUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    personalizedForUser?: UserUpdateOneWithoutJourneysNestedInput
  }

  export type LearningJourneyUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    personalizedForUserId?: NullableStringFieldUpdateOperationsInput | string | null
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningSessionOutlineUpsertWithoutStepsInput = {
    update: XOR<LearningSessionOutlineUpdateWithoutStepsInput, LearningSessionOutlineUncheckedUpdateWithoutStepsInput>
    create: XOR<LearningSessionOutlineCreateWithoutStepsInput, LearningSessionOutlineUncheckedCreateWithoutStepsInput>
    where?: LearningSessionOutlineWhereInput
  }

  export type LearningSessionOutlineUpdateToOneWithWhereWithoutStepsInput = {
    where?: LearningSessionOutlineWhereInput
    data: XOR<LearningSessionOutlineUpdateWithoutStepsInput, LearningSessionOutlineUncheckedUpdateWithoutStepsInput>
  }

  export type LearningSessionOutlineUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    learningSessionChats?: LearningSessionChatUpdateManyWithoutSessionOutlineNestedInput
  }

  export type LearningSessionOutlineUncheckedUpdateWithoutStepsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    objective?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    botTools?: StringFieldUpdateOperationsInput | string
    firstUserMessage?: StringFieldUpdateOperationsInput | string
    tags?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    learningSessionChats?: LearningSessionChatUncheckedUpdateManyWithoutSessionOutlineNestedInput
  }

  export type LearningSessionChatUpsertWithWhereUniqueWithoutStepInput = {
    where: LearningSessionChatWhereUniqueInput
    update: XOR<LearningSessionChatUpdateWithoutStepInput, LearningSessionChatUncheckedUpdateWithoutStepInput>
    create: XOR<LearningSessionChatCreateWithoutStepInput, LearningSessionChatUncheckedCreateWithoutStepInput>
  }

  export type LearningSessionChatUpdateWithWhereUniqueWithoutStepInput = {
    where: LearningSessionChatWhereUniqueInput
    data: XOR<LearningSessionChatUpdateWithoutStepInput, LearningSessionChatUncheckedUpdateWithoutStepInput>
  }

  export type LearningSessionChatUpdateManyWithWhereWithoutStepInput = {
    where: LearningSessionChatScalarWhereInput
    data: XOR<LearningSessionChatUpdateManyMutationInput, LearningSessionChatUncheckedUpdateManyWithoutStepInput>
  }

  export type LearningSessionChatCreateManyUserInput = {
    id?: string
    sessionOutlineId?: string | null
    stepId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningJourneyCreateManyPersonalizedForUserInput = {
    id?: string
    slug?: string | null
    order?: number | null
    title: string
    intro?: string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: boolean
    userGoalSummary?: string | null
    goalChatId?: string | null
    status: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserGoalCreateManyUserInput = {
    id?: string
    statement: string
    status?: $Enums.GoalStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningSessionChatUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    sessionOutline?: LearningSessionOutlineUpdateOneWithoutLearningSessionChatsNestedInput
    step?: LearningJourneyStepUpdateOneWithoutChatsNestedInput
    messages?: MessageUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionOutlineId?: NullableStringFieldUpdateOperationsInput | string | null
    stepId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionOutlineId?: NullableStringFieldUpdateOperationsInput | string | null
    stepId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningJourneyUpdateWithoutPersonalizedForUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: LearningJourneyStepUpdateManyWithoutJourneyNestedInput
  }

  export type LearningJourneyUncheckedUpdateWithoutPersonalizedForUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    steps?: LearningJourneyStepUncheckedUpdateManyWithoutJourneyNestedInput
  }

  export type LearningJourneyUncheckedUpdateManyWithoutPersonalizedForUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: NullableStringFieldUpdateOperationsInput | string | null
    order?: NullableIntFieldUpdateOperationsInput | number | null
    title?: StringFieldUpdateOperationsInput | string
    intro?: NullableStringFieldUpdateOperationsInput | string | null
    objectives?: NullableJsonNullValueInput | InputJsonValue
    isStandard?: BoolFieldUpdateOperationsInput | boolean
    userGoalSummary?: NullableStringFieldUpdateOperationsInput | string | null
    goalChatId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGoalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement?: StringFieldUpdateOperationsInput | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGoalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement?: StringFieldUpdateOperationsInput | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserGoalUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    statement?: StringFieldUpdateOperationsInput | string
    status?: EnumGoalStatusFieldUpdateOperationsInput | $Enums.GoalStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyChatInput = {
    id?: string
    role: string
    content: string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
  }

  export type MessageUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutChatInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    command?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningJourneyStepCreateManyJourneyInput = {
    id?: string
    sessionOutlineId: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningJourneyStepUpdateWithoutJourneyInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessionOutline?: LearningSessionOutlineUpdateOneRequiredWithoutStepsNestedInput
    chats?: LearningSessionChatUpdateManyWithoutStepNestedInput
  }

  export type LearningJourneyStepUncheckedUpdateWithoutJourneyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionOutlineId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUncheckedUpdateManyWithoutStepNestedInput
  }

  export type LearningJourneyStepUncheckedUpdateManyWithoutJourneyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionOutlineId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningJourneyStepCreateManySessionOutlineInput = {
    id?: string
    journeyId: string
    order: number
    status: string
    ahaText?: string | null
    unlockedAt?: Date | string | null
    completedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type LearningSessionChatCreateManySessionOutlineInput = {
    id?: string
    userId?: string | null
    stepId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningJourneyStepUpdateWithoutSessionOutlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    journey?: LearningJourneyUpdateOneRequiredWithoutStepsNestedInput
    chats?: LearningSessionChatUpdateManyWithoutStepNestedInput
  }

  export type LearningJourneyStepUncheckedUpdateWithoutSessionOutlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    journeyId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chats?: LearningSessionChatUncheckedUpdateManyWithoutStepNestedInput
  }

  export type LearningJourneyStepUncheckedUpdateManyWithoutSessionOutlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    journeyId?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    ahaText?: NullableStringFieldUpdateOperationsInput | string | null
    unlockedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LearningSessionChatUpdateWithoutSessionOutlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneWithoutChatsNestedInput
    step?: LearningJourneyStepUpdateOneWithoutChatsNestedInput
    messages?: MessageUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatUncheckedUpdateWithoutSessionOutlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    stepId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatUncheckedUpdateManyWithoutSessionOutlineInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    stepId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningSessionChatCreateManyStepInput = {
    id?: string
    userId?: string | null
    sessionOutlineId?: string | null
    sessionTitle?: string | null
    startedAt: Date | string
    endedAt?: Date | string | null
    lastMessageAt?: Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }

  export type LearningSessionChatUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    user?: UserUpdateOneWithoutChatsNestedInput
    sessionOutline?: LearningSessionOutlineUpdateOneWithoutLearningSessionChatsNestedInput
    messages?: MessageUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatUncheckedUpdateWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionOutlineId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
    messages?: MessageUncheckedUpdateManyWithoutChatNestedInput
  }

  export type LearningSessionChatUncheckedUpdateManyWithoutStepInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionOutlineId?: NullableStringFieldUpdateOperationsInput | string | null
    sessionTitle?: NullableStringFieldUpdateOperationsInput | string | null
    startedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    endedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastMessageAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableJsonNullValueInput | InputJsonValue
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}