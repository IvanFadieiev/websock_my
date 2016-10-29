class MicropostsController < ApplicationController
  include Helpers

  def chat
    @micropost = Micropost.new
  end

  def create
    @micropost = Micropost.new(micropost_params)
    if @micropost.save
      WebsocketRails[:posts].trigger 'chat', @micropost
      render json: { status: 200 }
    end
  end

  private
    def micropost_params
      params.require(:micropost).permit(:body, :owner)
    end
end
