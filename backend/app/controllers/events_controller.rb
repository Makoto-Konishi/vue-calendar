class EventsController < ApplicationController
  def index
    render json: Event.all
  end

  def show
    render json: Event.find(params[:id])
  end

  def create
    event = Event.new(event_params)
    if event.save
      # 保存したデータをjsonに変換してクライアントに返す
      render json: event
    else
      # 422 サーバ側でリクエストを正しく処理できなかった時に返すステータスコード
      render json: event.errors, status: 422
    end
  end

  def update
    event = Event.find(params[:id])
    if event.update(event_params)
      render json: event
    else
      render json: event.errors, status: 422
    end
  end

  def destroy
    event = Event.find(params[:id])
    event.destroy!
    render json: event
  end

  private 
  def event_params
    params.require(:event).permit(:id, :name, :start, :end, :timed, :description, :color)
  end
end
