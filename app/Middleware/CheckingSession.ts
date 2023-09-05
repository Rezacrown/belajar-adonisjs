import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckingSession {
  public async handle({auth}: HttpContextContract, next: () => Promise<void>) {

    await auth.use('web').check()

    await next()
  }
}
