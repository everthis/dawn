class UtilityController < CBaseController
    def return_req_cookie
        respond_to do |format|
            format.json { render json: cookies }
        end
    end
end
