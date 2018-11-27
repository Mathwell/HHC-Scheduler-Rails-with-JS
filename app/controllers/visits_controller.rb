class VisitsController < ApplicationController
  before_action :set_visit, only: [:show, :edit, :update, :destroy]


  def filter_by_nurse
    #raise params.inspect
    if !params[:visit][:nurse_id].blank?
       @nurse=Nurse.find(params[:visit][:nurse_id])
       respond_to do |format|
          format.json { render json: @visit}
          format.html { redirect_to nurse_visits_path(@nurse.id) }
       end
     else
       if !params[:visit][:patient_id].blank?
          @patient=Patient.find(params[:visit][:patient_id])
           respond_to do |format|
             format.html { redirect_to patient_visits_path(@patient.id) }
            end
        else
          respond_to do |format|
            format.html { redirect_to visits_path }
          end
        end
      end
  end

  def new
    @visit=Visit.new
    if !params[:nurse_id].blank?
      @visit.nurse_id=params[:nurse_id]
    end
  end

  def create

    if !@visit=Visit.find_by(nurse_id: params[:visit][:nurse_id], patient_id: params[:visit][:patient_id], date: params[:visit][:date])
      @visit = Visit.new(visit_params)
    end
    #binding.pry
    respond_to do |format|
      if @visit.save
        @nurse=Nurse.find(@visit.nurse_id)
        @patient=Patient.find(@visit.patient_id)
        @patient.nurse_id=@visit.nurse_id
        @patient.save        
        #format.html { redirect_to @visit, notice: 'New visit was successfully created.' }
        format.json { render json: @visit, notice: "success"}
      else       
        format.html { render :new }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @visit.update(visit_params)
        @patient=Patient.find(@visit.patient_id)
        @patient.update(nurse_id: @visit.nurse_id)

        format.html { redirect_to @visit, notice: 'Visit was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @visit.destroy

    respond_to do |format|
      format.html { redirect_to visits_url, notice: 'Visit was successfully destroyed.' }
    end
  end

  def index
    #raise params.inspect
    if !params[:nurse_id].blank?
      @nurse=Nurse.find(params[:nurse_id])
      @visits=Visit.where(nurse_id: params[:nurse_id])
    else
      if !params[:patient_id].blank?
        @visits=Visit.where(patient_id: params[:patient_id])
      else
        @visits=Visit.all
      end
    end
    @visit=@visits.first
    #binding.pry
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @visits}
    end

  end

  def show
    @visit=Visit.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @visit}
    end

  end

  private
 def set_visit
     @visit=Visit.find(params[:id])
 end

  def visit_params
    params.require(:visit).permit(
      :nurse_id,
      :patient_id,
      :date
          )
  end
end
