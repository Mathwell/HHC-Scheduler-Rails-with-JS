class PatientsController < ApplicationController
    before_action :set_patient, only: [:show, :edit, :update, :destroy]

 

  def choose_nurse
    #raise params.inspect
    if !params[:nurse][:id].blank?
       @nurse=Nurse.find(params[:nurse][:id])
       #@patients=Patient.by_nurse(params[:nurse][:id])
        respond_to do |format|
          format.html { redirect_to nurse_patients_path(@nurse.id) }
       end
     else
       respond_to do |format|
         format.html { redirect_to patients_path }
      end
    end
  end

  def new
    @patient = Patient.new
    if !params[:nurse_id].blank?
      @patient.nurse_id=params[:nurse_id]
    end
    @visit=Visit.new

  end

  def create
    if !@patient=Patient.find_by(first_name: params[:patient][:first_name], last_name: params[:patient][:last_name])
      @patient = Patient.new(patient_params)
    end
    @nurse=Nurse.find(@patient.nurse_id)
    #@nurse.patients<<@patient
    #raise @nurse.inspect
    #binding.pry
    respond_to do |format|
      if @patient.save
        #raise params.inspect
         if !@visit=Visit.find_by(nurse_id: @patient.nurse_id, patient_id: @patient.id, date: params[:patient][:date])
          raise @visit.inspect
            @visit=Visit.new(nurse_id: @patient.nurse_id, patient_id: @patient.id, date: params[:patient][:date])
            @visit.save

          end
        format.html { redirect_to @patient, notice: 'New patient account was successfully created.' }
      else
        #@patient.save
        #raise @patient.inspect
        format.html { redirect_to new_patient_path(@patient, nurse_id: @nurse.id), notice: @patient.errors.full_messages.join(" ")  }
      end
    end
  end

  def edit
  end

  def update
    respond_to do |format|
      if @patient.update(patient_params)
        @visit=Visit.new(nurse_id: @patient.nurse_id, patient_id: @patient.id, date: params[:patient][:date])
        @visit.save
        format.html { redirect_to @patient, notice: 'Patient account was successfully updated.' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @visits=@patient.visits
    @visits.each do |visit|
      visit.destroy
    end
    @patient.destroy
    respond_to do |format|
      format.html { redirect_to patients_url, notice: 'Nurse account was successfully destroyed.' }
    end
  end

  def index
    #raise params.inspect
    if !params[:nurse_id].blank?
      @nurse=Nurse.find(params[:nurse_id])
      @patients=@nurse.patients.uniq
      #@patients=@nurse.patients
      #raise @nurse.inspect
    else
      @patients=Patient.all
    end
    #@nurses=Nurse.all
    #@patients=Patient.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @patients}      
    end   
  end

  def show
    @visits = @patient.visits
    render json: @patient
  end

  def most_visits
    @patients=Patient.most_visits
    #binding.pry
    respond_to do |format|
      format.html { render :mostvisits }
    end
  end

  private
    def set_patient
      @patient = Patient.find(params[:id])
    end

    def patient_params
      params.require(:patient).permit(
        :first_name,
        :last_name,
        :nurse_id
            )
    end
end
