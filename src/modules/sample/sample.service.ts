import { ApiError } from "../../utils/api-error";
import { PrismaService } from "../prisma/prisma.service";

export class SampleService {
  private prisma: PrismaService;

  constructor() {
    this.prisma = new PrismaService();
  }

  getSample = async (id: number) => {
    const sample = await this.prisma.sample.findFirst({
      where: { id: id },
    });
    if (!sample) {
      throw new ApiError("sample not found", 400);
    }
    return sample;
  };
}
