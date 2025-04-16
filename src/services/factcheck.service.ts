import { request } from '@/hooks/api';

class FactcheckService {
  /**
   * 
   * @param {Object} summarytext - The data of the sumarry.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async factcheckUrl(url) {
    try {
      const response = await request(
        '/check/url',
        'POST',
        url,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
  static async reviewFactcheckUrl(url) {
    try {
      const response = await request(
        '/review/url',
        'POST',
        url,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * summarising text contents.
   * @param {Object} summaryUpload - The data of the sumarry.
   * @returns {Promise<Object>} - The response data from the server.
   */
 
  async factcheckUpload(uploadData) {
    try {
      const response = await request(
        '/check/file/url',
        'POST',
        uploadData,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a workspace by its ID.
   * @param {string} summarytextId - The ID of the workspace to get.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async getFact(id) {
    try {
      const response = await request(
        `/fact/${id}`,
        'GET',
        {},
        true,
        true,
        false
      );
      if (response.status == false) {
        return false;
      }
      return JSON.parse(response);
    } catch (error) {
      throw error;
    }
  }

  async getFactHistory(page=1) {
    try {
      const response = await request(
        `/fact/user?page=${page}`,
        'GET',
        {},
        true,
        true,
        false
      );
      if (response.status == false) {
        return false;
      }

      console.log('Fact History Response: ', (response))
      return JSON.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a summary by its ID.
   * @param {string} id - The ID of the summary to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  static async deleteFact(id) {
    try {
      await request(
        `/delete/fact/${id}`,
        'PUT',
        {},
        true,
        false,
        false
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a summary by its ID.
   * @param {string} id - The ID of the summary to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  static async bookMarkFact(id) {
    try {
      await request(
        `/bookmark/fact/${id}`,
        'PUT',
        {},
        true,
        false,
        false
      );
    } catch (error) {
      throw error;
    }
  }


}

// Export the Service class.
export default FactcheckService;
