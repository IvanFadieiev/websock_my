module Helpers
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_user!
    before_action :set_user
  end

  private
    def set_user
      @user = User.find(params[:id]) if params[:id]
    end
end