import { v4 as uuidv4 } from 'uuid';
import prisma from '@lib/prisma';
import { SupabaseProvider } from '@/providers/storage/supabase/supabaseProvider';

export default class LinkService {

  static generateLinkDetails(): { linkUrl: string, linkId: string; } {
    const uniqueId = uuidv4();
    const HOST = process.env.HOST || 'http://localhost:3000';

    return {
      linkId: uniqueId,
      linkUrl: `${HOST}/links/${uniqueId}`
    };
  }

  static async deleteLink(linkId: string): Promise<void> {
    return;
  }

  static async getLink(linkId: string) {
    return prisma.link.findUnique({
      where: { linkId },
    });
  }

  static async getFileFromLink(linkId: string): Promise<{ signedUrl: string, fileName: string, size: number }> {
    const bucketName = 'documents';
    let link = await prisma.link.findUnique({
      where: {
        linkId
      },
      include: {
        Document: true
      }
    });

    if (!link || !link.Document) {
      throw [404, "Link not found"];
    }

    if (link.expirationTime && new Date(link.expirationTime) < new Date()) {
      throw [410, "Link has expired"];
    }

    const supabaseProvider = new SupabaseProvider();
    const signedUrl = await supabaseProvider.generateSignedUrl(bucketName, link.Document.filePath);

    return { signedUrl, fileName: link.Document.fileName, size: link.Document.size };
  }
}
