class NursesController < ApplicationController
  before_action :set_nurse, only: [:show, :edit, :update, :destroy]

  def new
    @nurse = Nurse.new
  end

  def body
    nurse = Nurse.find(params[:id])
    render plain: nurse.patients
  end

  def filter_nurses
    #raise params.inspect
    if params[:nurse][:visits]!=""
       @nurses=Nurse.where(visits: params[:nurse][:visits])
       #@patients=@nurse.patients
        respond_to do |format|
          format.html { redirect_to nurses_path }
       end
     else
       respond_to do |format|
         format.html { redirect_to patients_path }
      end
    end
  end


  def create
    @nurse = Nurse.new(nurse_params)
    respond_to do |format|
      #raise @nurse.inspect
      if @nurse.save
        format.html { redirect_to @nurse, notice: 'New nurse account was successfully created.' }
        #raise @nurse.inspect
      else

        format.html { render :new }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @nurse.update(nurse_params)
        format.html { redirect_to @nurse, notice: 'Nurse account was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  def most_loaded
    @nurses=Nurse.most_load
    respond_to do |format|
      format.html { render :index }
    end
  end

  def destroy
    @nurse.destroy
    respond_to do |format|
      format.html { redirect_to nurses_url, notice: 'Nurse account was successfully destroyed.' }
    end
  end

  def index
    @nurses = Nurse.where(role: "nurse")
  end

  def show
    @visits = @nurse.visits
  end

  private

    def set_nurse
      @nurse = Nurse.find(params[:id])
    end

    def nurse_params
      params.require(:nurse).permit(
        :first_name,
        :last_name,
        :role
      )
    end

end
