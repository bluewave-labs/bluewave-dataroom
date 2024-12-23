import { v4 as uuidv4 } from 'uuid';
import prisma from '@lib/prisma';
import { SupabaseProvider } from '@/providers/storage/supabase/supabaseProvider';

export default class LinkService {

  static generateLinkUrl(host: string): string {
    const uniqueId = uuidv4();

    return `${host}/${uniqueId}`;
  }

  static async deleteLink(linkId: string): Promise<void> {
    return;
  }

  static async getFileFromLink(linkId: string): Promise<string> {
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

    if (!link.isPublic) {
      throw [403, "Link is not public"];
    }

    if (link.expirationTime && new Date(link.expirationTime) < new Date()) {
      throw [410, "Link has expired"];
    }

    const supabaseProvider = new SupabaseProvider();
    const signedUrl = await supabaseProvider.generateSignedUrl(bucketName, link.Document.filePath);

    return signedUrl;
  }
}
