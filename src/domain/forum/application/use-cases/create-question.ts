import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'

interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string


}

interface CreateQuestionUseCaseResponse {
   question: Question

}

export class CreateQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {
  }

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<Question> {
    const question = Question.create({
        authorId: new UniqueEntityID(authorId),
        title,
        content,
    })
    await this.questionRepository.create(question)

    return question
  }
}
