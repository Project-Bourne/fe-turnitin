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

  /**
   * summarising text contents.
   * @param {Object} summaryUpload - The data of the sumarry.
   * @returns {Promise<Object>} - The response data from the server.
   */
 
  async factcheckUpload(uploadData) {
    try {
      const response = await request(
        '/summary/file',
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

  async getFactHistory() {
    try {
      const response = await request(
        '/fact/user',
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

  /**
   * Delete a summary by its ID.
   * @param {string} id - The ID of the summary to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  static async deleteSummary(id) {
    try {
      await request(
        `/delete/summary/history/${id}`,
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

  static async bookMarkSummary(id) {
    try {
      await request(
        `/bookmark/summary/${id}`,
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
