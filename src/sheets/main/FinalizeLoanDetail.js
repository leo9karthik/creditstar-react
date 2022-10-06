import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header'
import { useForm } from "react-hook-form";
import AuthContext from '../../store/auth-context';
import { toast } from 'react-toastify';
import gs from '../../service/global';
import axios from 'axios';

const { REACT_APP_PUBLIC_URL, REACT_APP_FLOWID } = process.env;

const FinalizeLoanDetail = () => {
    const authCtx = useContext(AuthContext);
    var instanceId = authCtx?.instanceId;
    // console.log(authCtx);


    const navigate = useNavigate();

    /* react-form-hook */
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        // mode: "onBlur",
        mode: "all",
    });
    /* react-form-hook end */


    /* Post data */
    const onSubmit = (data) => {
        let inputData = data;

        let payload = {
            "action": "submit",
            "data": {
                "preContractConsent": inputData?.preContractConsent,
                "agreementConsent": inputData?.agreementConsent
            }
        }
        console.log(payload);


        /* Loader Starts */
        gs.showLoader(true);
        /* Loader Ends */

        axios.post(`/v1/flow/${REACT_APP_FLOWID}/instances/${instanceId}`, payload)
            .then((response) => {
                const result = response?.data;
                AuthContext.currentStepFunc(result?.currentStepId);
                console.log(result);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

                toast.success('Your all set', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });


                // redirect to your-all-set
                // navigate("/your-all-set", { replace: true });

            })
            .catch((error) => {
                console.log(error);

                /* Loader Starts */
                gs.showLoader(false);
                /* Loader Ends */

                toast.error('Something went wrong!', {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            });

    }
    /* Post data end */

    return (
        <div>

            {/* Header Starts */}
            <Header />
            {/* Header Ends */}


            {/* Main Container Starts */}
            <div className="main-container">
                <div className="banner-top-img inner-bg-img" style={{ backgroundImage: `url('${REACT_APP_PUBLIC_URL}/img/inner-bg-img.jpg')` }} ></div>
                <div className="container">
                    {/* start */}
                    <div className="welcome-box">

                        <div className="welcome-right">
                            {/* start */}
                            <div className="comm-box wel-loan desktop-comp">
                                <div className="comm-hdn-box loan-det-hdn">
                                    <h3 className="comm-hdn">
                                        Your approved loan
                                    </h3>
                                    {/* <a href="#" class="comm-link">Change</a> */}
                                </div>

                                <div className="loan-card-det">
                                    <div className="check-list">
                                        <div className="check-lis-hdn">Amount</div>
                                        {authCtx?.amountSlideValue && <p className="check-amount">£{authCtx?.amountSlideValue}</p>}
                                    </div>
                                    <div className="check-list">
                                        <div className="check-lis-hdn">Period</div>
                                        {authCtx?.periodSlideValue && <p className="check-amount">{authCtx?.periodSlideValue / 30} months</p>}
                                    </div>
                                </div>
                                <div className="rnge-total mb0">
                                    <h6 className="rnge-total-hdn">Estimated monthly payment</h6>
                                    {authCtx?.numMonthlyPayment && <h6 className="rnge-total-price">£{authCtx?.numMonthlyPayment}</h6>}
                                </div>

                            </div>
                            {/* end */}
                            {/* start */}
                            <div className="comm-box wel-loan mob-comp">
                                <div className="card-amt-flex">
                                    <div className="card-amt">
                                        <h6>Loan amount</h6>
                                        {authCtx?.amountSlideValue && <p>£{authCtx?.amountSlideValue}</p>}
                                    </div>
                                    <div className="card-amt">
                                        <h6>Period</h6>
                                        {authCtx?.periodSlideValue && <p>{authCtx?.periodSlideValue / 30} months</p>}
                                    </div>
                                    <div className="card-amt">
                                        <h6>Estimated payment</h6>
                                        {authCtx?.numMonthlyPayment && <h6>£{authCtx?.numMonthlyPayment} /mo</h6>}
                                    </div>
                                </div>
                            </div>
                            {/* end */}
                        </div>


                        <div className="welcome-left">
                            {/* start */}
                            <div className="comm-box">
                                <div className="comm-hdn-box">
                                    <h3 className="comm-hdn">
                                        Your loan terms
                                    </h3>
                                    <div className="comm-para">
                                        <p>Review and confirm your loan details &amp; terms below.</p>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="term-main-box">
                                        <div className="form-quest-box">
                                            <p className="form-quest">Key facts</p>
                                        </div>
                                        <div className="term-height mb0">
                                            <div className="term-box comm-scroll">
                                                {/* <div class="term-hdn-box">
                                                    <h6 class="term-box-hdn"></h6>
                                                    <div class="term-box-para">
                                                        <p></p>
                                                    </div>
                                                </div> */}
                                                <div className="term-content">
                                                    <h6>An explanation of your loan</h6>
                                                    <p>Is this loan right for you?</p>
                                                    <ul>
                                                        <li>
                                                            <p>
                                                                We want to make sure that the loan meets your needs and financial
                                                                situation
                                                                before you proceed. Please consider the Pre-Contract Credit
                                                                Information
                                                                we’ve
                                                                provided and the points set out below. If you receive this
                                                                explanation
                                                                in
                                                                person, you can take it away and consider it.
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                The full terms and conditions relating to your loan are set out in
                                                                the
                                                                credit
                                                                agreement and this document is only a general explanation of its key
                                                                features.
                                                                Please read your agreement before signing it.
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                If you’d like any more information or have any questions about the
                                                                agreement,
                                                                you
                                                                can email contactus@zopa.com, or call 020 7580 6060.
                                                            </p>
                                                        </li>
                                                    </ul>
                                                    <h6>
                                                        What you can use your loan for
                                                    </h6>
                                                    <ul>
                                                        <li>
                                                            <p>
                                                                Your loan is a fixed-sum loan and you will receive the full amount
                                                                of
                                                                the
                                                                loan in one go. Fixed sum loans can help you spread the costs of
                                                                more
                                                                expensive one-off items, such as home improvements, over a period
                                                                that
                                                                suits
                                                                you. They are less suitable to cover day to day expenditure or as a
                                                                deposit
                                                                for other credit agreements.
                                                            </p>
                                                        </li>
                                                    </ul>
                                                    <h6>
                                                        If you intend to use your loan to consolidate existing debts, you should be
                                                        aware
                                                        that this may result in:
                                                    </h6>
                                                    <ul>
                                                        <li>
                                                            <p>
                                                                payment of a higher rate of interest or charges or both; your
                                                                repayment
                                                                period
                                                                increasing. Repayments You will repay the total amount payable of
                                                                £21,552.99
                                                                in
                                                                60 monthly Repayments of £359.22.
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                You must make your repayments by Direct Debit. Your payments are
                                                                calculated
                                                                to
                                                                make sure your loan is paid off by the end of the agreement,
                                                                provided
                                                                you
                                                                keep
                                                                up your repayments.
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                You can repay your loan early in full or in part at any time by
                                                                making
                                                                lump sum payments.
                                                            </p>
                                                        </li>
                                                    </ul>
                                                    <h6>
                                                        What happens if you don’t make repayments?
                                                    </h6>
                                                    <p>
                                                        Missing payments could have severe consequences for you:
                                                    </p>
                                                    <ul>
                                                        <li>
                                                            <p>
                                                                we will report missed payments to credit reference agencies, which
                                                                may
                                                                affect your credit rating and make it more difficult and expensive
                                                                for
                                                                you to obtain credit from us and other lenders; you will have to
                                                                repay
                                                                the outstanding balance (including arrears) payable under the
                                                                agreement,
                                                                less any rebate of credit charges to which you are entitled by law;
                                                                we
                                                                may take legal proceedings against you and you may have to pay our
                                                                legal
                                                                costs and other expenses; we may also obtain a charging order (or in
                                                                Scotland an inhibition) on your home to enforce any court judgment
                                                                we
                                                                obtain. This could result in the outstanding debt being secured
                                                                against
                                                                your home; and you will be charged no interest or fees for missing
                                                                payments. Your right of withdrawal You have the right to withdraw
                                                                from
                                                                the agreement orally, by calling us on 020 7580 6060, or by emailing
                                                                contactus@zopa.com before the end of 14 days beginning on (a) the
                                                                day
                                                                the Agreement is made (i.e. the day you sign it), or (b) the day you
                                                                receive a copy of the signed Agreement, whichever is the latest. If
                                                                you
                                                                withdraw from the agreement you must repay the loan amount within 30
                                                                days after you told us you wanted to withdraw.
                                                            </p>
                                                        </li>
                                                    </ul>
                                                    <h6>
                                                        Pre-Contract Credit Information
                                                    </h6>
                                                    <ul>
                                                        <li>
                                                            <p>
                                                                1. Contact details Creditor. Zopa Bank Limited, (company
                                                                registration
                                                                10627575) (“Creditor”, “we”, “us”, “our”) Address. 1st Floor,
                                                                Cottons
                                                                Centre, Tooley Street, London. SE1 2QG, United Kingdom E-mail
                                                                address.
                                                                contactus@zopa.com Web address. www.zopa.com
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                2. Key features of the credit product Fixed Sum Loan The total
                                                                amount of
                                                                credit. This means the amount of credit to be provided under the
                                                                proposed credit agreement or the credit limit. £15,000.00 How and
                                                                when
                                                                credit would be provided. We will pay the amount of credit into your
                                                                nominated bank account. Unless you've asked us to pay off an
                                                                existing
                                                                Zopa loan, in which case we will do that first and pay the remainder
                                                                of
                                                                the funds into your nominated bank account. Either way, payment will
                                                                be
                                                                made no more than 3 working days after the loan start date. The
                                                                duration
                                                                of the credit agreement. 60 Months from the date we match you with
                                                                your
                                                                lender. We will confirm this date to you in writing. Repayments. You
                                                                will repay the total amount payable of £21,552.99 in 60 monthly
                                                                Repayments of £359.22. Your first payment will be due and payable
                                                                one
                                                                (1) month after the date on which we match you with your lender (as
                                                                confirmed to you in writing at that time). Each subsequent Repayment
                                                                will be due and payable on the same date of each consecutive month
                                                                thereafter. The total amount you will have to pay. This means the
                                                                amount
                                                                you have borrowed plus interest and other costs. Total amount
                                                                payable:
                                                                £21,552.99 Comprising: Principal: £15,000.00 Borrowing Fee: £0.00
                                                                Total
                                                                interest: £6,552.99
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                3. Costs of the credit The rates of interest which apply to the
                                                                credit
                                                                agreement. The Borrowing Rate is the total rate of interest you will
                                                                pay. It will apply to both the Principal and the borrowing fee and
                                                                is
                                                                calculated based on an interest rate of 16.4% a year (fixed).
                                                            </p>
                                                            <p>
                                                                Interest is charged daily on the outstanding balance of your loan.
                                                                So
                                                                that you pay the same amount each month, we calculate your monthly
                                                                Repayment based on the expected interest you will pay if you keep to
                                                                the
                                                                terms of your loan. The aggregate figure is spread over the duration
                                                                of
                                                                the Loan Contract to work out the monthly Repayment. We have assumed
                                                                that you make all your payments on their due dates (see above under
                                                                the
                                                                heading ‘Repayments’) and no variations occur under the agreement.
                                                            </p>
                                                        </li>
                                                    </ul>
                                                    <h6>
                                                        Annual Percentage Rate of Charge (APR).
                                                    </h6>
                                                    <ul>
                                                        <li>
                                                            <p>
                                                                This is the total cost expressed as an annual percentage of the
                                                                total
                                                                amount of credit. The APR is there to help you compare different
                                                                offers.
                                                                16.4% Related costs Any other costs deriving from the credit
                                                                agreement.
                                                                Borrowing fee of £0.00 Costs in the case of late payments. You will
                                                                be
                                                                charged no additional interest or fees for missing payments.
                                                                Consequences of missing payments. Missing payments could have severe
                                                                consequences including the possibility of legal proceedings to
                                                                enforce
                                                                the terms of this Agreement and making it more difficult to obtain
                                                                credit in the future. You will be responsible for any litigation
                                                                costs
                                                                and expenses we incur, including legal fees and expenses.
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                4. Other important legal aspects Right of withdrawal.
                                                                You have the right to withdraw from the credit agreement before the
                                                                end
                                                                of 14 days beginning with the day after (1) the day on which the
                                                                agreement is made, or (2) the day you receive a copy of the signed
                                                                agreement, whichever is the latest. Early repayment. You have the
                                                                right
                                                                at any time to repay early in full or in part any amount owed under
                                                                the
                                                                credit agreement. Consultation with a Credit Reference Agency.
                                                                Should we
                                                                decide not to proceed with a prospective consumer credit agreement
                                                                on
                                                                the basis of information from a credit reference agency we will
                                                                inform
                                                                you that the decision has been reached on the basis of information
                                                                from
                                                                a credit reference agency and of the particulars of that agency.
                                                                Right
                                                                to a draft credit agreement. You have the right upon request, to
                                                                obtain
                                                                a copy of the draft credit agreement free of charge, unless we are
                                                                unwilling at the time of the request to proceed to the conclusion of
                                                                the
                                                                credit agreement. 5. Additional information in the case of distance
                                                                marketing of financial services (a) concerning the creditor
                                                                Registration
                                                                number. Zopa Bank Limited (company registration 10627575) is entered
                                                                on
                                                                the Financial Services Register under firm registration number
                                                                800542.
                                                                The supervisory authority. The Prudential Regulation Authority and
                                                                the
                                                                Financial Conduct Authority (b) concerning the credit agreement The
                                                                law
                                                                taken by the creditor as a basis for the establishment of relations
                                                                with
                                                                you before the conclusion of the credit agreement. English and Welsh
                                                                law. The law applicable to the credit agreement and/or the competent
                                                                court. The law applicable to the credit agreement is English and
                                                                Welsh
                                                                law.
                                                            </p>
                                                        </li>
                                                        <li>
                                                            <p>
                                                                The courts of England and Wales will deal with questions relating to
                                                                the
                                                                credit agreement unless you live in Scotland or Northern Ireland, in
                                                                which case you can choose the courts of those countries to deal with
                                                                any
                                                                questions that arise. Language to be used in connection with the
                                                                credit
                                                                agreement. English (c) concerning redress Access to out-of-court
                                                                complaint and redress mechanism. Our Complaints Handling Policy If
                                                                you
                                                                want to make a complaint about the Loan Contract or Zopa you can
                                                                email
                                                                complaints@zopa.com with brief details of your complaint and your
                                                                account reference. Zopa will acknowledge your complaint within one
                                                                business day. Zopa will then investigate and send you an initial
                                                                response. This should take no longer than three business days. We
                                                                will
                                                                keep you informed of our investigations and will aim to resolve the
                                                                matter within four weeks of receiving your complaint. If within
                                                                eight
                                                                weeks after receiving a complaint we are still not able to resolve
                                                                the
                                                                matter, we will send you a final response. If you don't agree with
                                                                our
                                                                final response you may refer your complaint to the Financial
                                                                Ombudsman
                                                                Service, who can be contacted by telephone on 0800 023 4567 or at
                                                                www.financial-ombudsman.org.uk. You also have the right to make a
                                                                complaint directly to the Financial Ombudsman Service. Key Facts
                                                            </p>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            {/* start */}
                                            <div className="chk-main-term">
                                                <div className="checkbox-box term-chk mb0">
                                                    <input
                                                        type="checkbox"
                                                        id="preContractConsent"
                                                        name="preContractConsent"
                                                        {...register("preContractConsent", {
                                                            required: "Precontract consent is required"
                                                        })}
                                                    />
                                                    <label className="chk-label" htmlFor="preContractConsent">
                                                        I have read and agree to the Key Facts, which explain the details of the loan contract.
                                                    </label>
                                                </div>
                                            </div>
                                            {/* end */}
                                        </div>
                                        {errors.preContractConsent &&
                                            <div className="form-input-error">
                                                <i className="icon-input-error"></i>
                                                <p>{errors.preContractConsent.message}</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="term-main-box">
                                        <div className="form-quest-box">
                                            <h6 className="form-quest">Loan conditions</h6>
                                            <div className="form-para">
                                                <p>Your Creditstar loan contract summary</p>
                                            </div>
                                        </div>
                                        <div className="term-height mb0">
                                            <div className="term-box comm-scroll">
                                                <div className="term-content">
                                                    <h6>
                                                        Fixed Sum Loan Agreement regulated by the Consumer Credit Act 1974
                                                    </h6>
                                                    <p>
                                                        Lender: Creditstar UK Limited, Mappin House, Oxford Street, London, W1W 8HF,
                                                        (company registration No. 7085760); (“Lender”, “we”, “us”, “our”)
                                                    </p>
                                                    <p>
                                                        Borrower: Mr James Storer of 34, Waltham Road, Bournemouth, BH76PF
                                                        (“Borrower”,
                                                        “you”, “your”)
                                                    </p>
                                                    <p>
                                                        Included with this document are the terms and conditions of the agreement
                                                        (the ‘Loan Conditions’). They describe what you are agreeing to, your legal
                                                        rights, what happens if you don’t keep up repayments and other information.
                                                        Please read the Loan Conditions carefully before signing this agreement. All
                                                        references to Loan Conditions in this agreement refer to this section.
                                                    </p>
                                                    <h6>
                                                        Key Financial Information
                                                    </h6>
                                                    <p>
                                                        Duration of this Agreement, the time you have the loan for, assuming you
                                                        make all payments on time: 60 months from the date of when we match you with
                                                        your lender. We will confirm this date to you in writing. Amount of Credit
                                                        (A): £15,000.00 Borrowing Fee (B): £0.00 Interest Charges (C): £6,552.99 The
                                                        total amount of interest payable by you on the Amount of Credit and
                                                        Borrowing Fee, assuming the loan is repaid on time. Borrowing Rate made up
                                                        of: 16.4% a year fixed The Borrowing Rate is the total rate of interest you
                                                        will pay. It applies to both the Amount of Credit and Borrowing Fee. Total
                                                        Charge for Credit (B+C): £6,552.99 Total Amount Payable (A+B+C): £21,552.99
                                                        APR: 16.4% When calculating the APR, we have assumed that the agreement will
                                                        continue for the full duration, that there are no changes to the agreement,
                                                        that you make all due repayments in full and on time, and that we comply
                                                        with our obligations under the agreement.
                                                    </p>
                                                    <h6>
                                                        How your loan will be paid
                                                    </h6>
                                                    <p>
                                                        We will pay the amount of credit to your Nominated Account. Unless you've
                                                        asked
                                                        us to pay off an existing Zopa loan, in which case we will do that first and
                                                        pay
                                                        the remainder of the funds into your Nominated Account. Either way, payment
                                                        will
                                                        be made no more than 3 working days after the Loan Contract start date. We
                                                        start
                                                        charging interest when we match you with a lender, and your loan term starts
                                                        from that date.
                                                    </p>
                                                    <h6>
                                                        Repayments
                                                    </h6>
                                                    <p>
                                                        The amount of £359.22 must be paid monthly over 60 months. Your first
                                                        Repayment
                                                        will be due and payable one (1) month after the date on which on which we
                                                        match
                                                        you with a lender. We will confirm your repayment date to you in writing and
                                                        each subsequent Repayment will be due and payable on the same date of each
                                                        consecutive month thereafter (the “Repayment Date”). All Repayments are to
                                                        be
                                                        made in accordance with clause 2 of the Loan Conditions.
                                                    </p>
                                                    <h6>
                                                        The order in which Repayments made will be applied towards the discharge of
                                                        sums
                                                        due will be:
                                                    </h6>
                                                    <p>
                                                        first to pay the interest and principal due under the latest monthly
                                                        Repayment
                                                        that is due and payable under the Loan Contract;
                                                        then to pay any arrears of principal and interest under the Loan Contract;
                                                        then to pay any fees, charges, costs or expenses due to Zopa or any third
                                                        party
                                                        under the Loan Contract.
                                                        Charges
                                                        In addition to the Interest Charges and Borrowing Fee mentioned in the “Key
                                                        Financial Information” above, you may have to pay our legal costs and other
                                                        expenses if we have to take legal proceedings against you because you have
                                                        outstanding arrears on your loan.
                                                    </p>
                                                    <p>
                                                        You can find more details in Clause 5 of the Loan Conditions.
                                                    </p>
                                                    <h6>
                                                        Key Information
                                                    </h6>
                                                    <p>
                                                        Statement Of Account
                                                    </p>
                                                    <p>
                                                        You are entitled to receive, on request, and free of charge, at any time
                                                        throughout the duration of this Agreement pursuant to section 77B of the
                                                        Consumer Credit Act 1974 (“the Act”) a statement in the form of a table
                                                        showing
                                                        (a) the details of each instalment owing under the Agreement; (b) the date
                                                        on
                                                        which each instalment is due, the amount and any conditions relating to the
                                                        payment of the instalment; and (c) a breakdown of each instalment showing
                                                        how
                                                        much comprises (i) capital repayment, (ii) interest payment, and (iii) if
                                                        applicable, any other charges. The information contained in the statement is
                                                        valid only until the charges are varied in accordance with the terms of this
                                                        Agreement.
                                                    </p>
                                                    <h6>
                                                        Missing Payments
                                                    </h6>
                                                    <p>
                                                        Missing payments could have severe consequences, including the possibility
                                                        of
                                                        legal proceedings to enforce the terms of this Agreement and making it more
                                                        difficult to obtain credit in the future. You will be responsible for any
                                                        litigation costs and expenses we incur, including legal fees and expenses.
                                                    </p>
                                                    <p>
                                                        We will charge no additional interest or charges on missed payments.
                                                    </p>
                                                    <h6>
                                                        Supervisory Authority
                                                    </h6>
                                                    <p>
                                                        The Financial Conduct Authority, 12 Endeavour Square, London E20 1JN is the
                                                        supervisory authority under the Consumer Credit Act 1974.
                                                    </p>
                                                    <p>
                                                        The Lender is authorised and regulated by the Financial Conduct Authority,
                                                        and
                                                        entered on the Financial Services Register under firm registration number
                                                        800542.
                                                    </p>
                                                    <h6>
                                                        Right To Withdraw
                                                    </h6>
                                                    <p>
                                                        You have the right to withdraw from this Agreement without giving any reason
                                                        by
                                                        giving us oral or written notice of your intention to withdraw within 14
                                                        days
                                                        after (a) the day the Agreement is made (i.e. the day you sign it), or (b)
                                                        the
                                                        day you receive a copy of the signed Agreement, whichever is the latest. Any
                                                        such notice of withdrawal must be given to us either orally by calling 0207
                                                        580
                                                        6060 or by email to contactus@zopa.com or by facsimile transmission to 0207
                                                        183
                                                        1673 or by post at our address listed above. Where you give us such notice
                                                        of
                                                        withdrawal, you must repay to us any credit provided to you under this
                                                        Agreement. We will not charge any interest. You must make such repayment
                                                        without
                                                        undue delay and no later than the end of the period of 30 days beginning
                                                        with
                                                        the day after which the notice of withdrawal was given. The credit due and
                                                        payable in the event of your withdrawal must be paid to us at the following
                                                        bank
                                                        account:
                                                        Account name Zopa Bank Ltd.
                                                        Account number 11314480
                                                        Sort code 16-00-30
                                                    </p>
                                                    <h6>
                                                        Early Repayment
                                                    </h6>
                                                    <p>
                                                        You may repay early in full or in part any amount owed under this Agreement
                                                        under section 94 of the Act. Please see Clause 3 of the Loan Conditions for
                                                        the
                                                        procedure for early repayment.
                                                    </p>
                                                    <h6>
                                                        Financial Ombudsman
                                                    </h6>
                                                    <p>
                                                        If you have taken the loan on your own behalf and not for your business, you
                                                        have the right to complain to the Financial Ombudsman Service if you make a
                                                        complaint to us and are not happy with the response. If you have taken the
                                                        loan
                                                        as a business loan, you may have the right to complain to the Financial
                                                        Ombudsman Service. You can find more information on who can make complaints
                                                        at
                                                        the Financial Ombudsman website.
                                                    </p>
                                                    <h6>
                                                        Declaration
                                                    </h6>
                                                    <p>
                                                        Signing this agreement means you are entering into a legally binding
                                                        agreement
                                                        to keep to its terms (including the Loan Conditions). The agreement is made
                                                        when
                                                        you sign it electronically and we receive your signed agreement.
                                                    </p>
                                                    {/* <p>
                                                        Signed by the Borrower on <date to be inserted></date> at <time to be inserted>
                                                        </time>
                                                    </p> */}
                                                    <p>
                                                        Signed by the Lender on 06/06/2022 at 14:53
                                                    </p>
                                                    <h6>
                                                        Loan Conditions
                                                    </h6>
                                                    <p>
                                                        Set out below are the detailed legal terms that apply to Loan Contracts
                                                        entered into on the Lending Platform.
                                                    </p>
                                                    <h6>
                                                        Loan Conditions - Cash Loan
                                                    </h6>
                                                    <p>
                                                        These Loan Conditions will apply to each Loan Contract entered into
                                                        through the Lending Platform for a cash loan. They set out details of
                                                        each loan made using the lending platform. They also set out the terms
                                                        that apply to us as a loan servicer. These terms add to your Loan
                                                        Contract.
                                                    </p>
                                                    <p>
                                                        Capitalised terms not otherwise defined in these Loan Conditions have
                                                        the meaning given in clause 17.
                                                    </p>
                                                    <h6>
                                                        1. Loan Drawdown and Disbursement
                                                    </h6>
                                                    <p>
                                                        We will pay the amount of credit to your Nominated Account. Unless
                                                        you've asked us to pay off an existing Zopa loan, in which case we will
                                                        do that first and pay the remainder of the funds into your Nominated
                                                        Account.
                                                    </p>
                                                    <p>
                                                        Either way, payment will be made no more than 3 working days after the
                                                        Loan Contract start date. We start charging interest when we match you
                                                        with a lender, and your loan term starts from that date.
                                                    </p>
                                                    <h6>
                                                        2. Payment
                                                    </h6>
                                                    <p>
                                                        You must repay the total amount payable under each Loan Contract by
                                                        paying the Repayments on the Repayment Date shown in the Loan Contract
                                                        or, where you enter into more than one Loan Contract at or about the
                                                        same time, the relevant Loan Contract Summary. Prompt payment is
                                                        essential.
                                                    </p>
                                                    <p>
                                                        Interest is charged daily on the outstanding balance of your loan. So
                                                        that you pay the same amount each month, we calculate your monthly
                                                        payment based on the expected interest you will pay if you keep to the
                                                        terms of your loan. The aggregate figure is spread over the duration of
                                                        the Loan Contract to work out the monthly Repayment.
                                                    </p>
                                                    <p>
                                                        As long as you make your monthly Repayment in full, it will pay off both
                                                        some of your loan and all of the interest that has been charged on your
                                                        loan for that month. The proportion of your monthly Repayment which is
                                                        paid towards Interest Charges and the amount paid towards the principal
                                                        loan sum will work on an amortising basis. This means that the
                                                        proportion of your monthly Repayment that is paid towards the Interest
                                                        Charges is at its highest at the start of your loan, but this proportion
                                                        will reduce as the principal sum of your loan reduces. Because we charge
                                                        daily interest, if you decide to settle your loan early then the
                                                        settlement amount will be calculated on the day of settlement and you
                                                        will not be owed any rebate for any interest paid prior to the date of
                                                        early settlement. If you fail to make payments on time, your monthly
                                                        Repayment amount will stay the same. This means that your loan may not
                                                        reduce as fast as expected and the duration of your Loan Contract may
                                                        increase.
                                                    </p>
                                                    <p>
                                                        Your obligation to make Repayments will be satisfied by making payments
                                                        into the Zopa Customers' Account (or such other bank account as Zopa may
                                                        approve) by using a payment method approved by Zopa. If we have approved
                                                        an arrangement under which your Repayments will be deducted and paid to
                                                        us by a third party on your behalf from monies owed to you by that third
                                                        party (e.g. you may have arranged for your Repayments to be deducted and
                                                        paid from your salary):
                                                    </p>
                                                    <p>
                                                        you are still responsible for ensuring that the Repayments are made on
                                                        time; and
                                                        if any Repayment is missed under that arrangement, we shall be entitled
                                                        to collect the missed Repayment by any other payment method that you
                                                        have registered with us, including under any direct debit mandate.
                                                        Each Repayment will be used:
                                                        first to pay the interest and principal due under the latest monthly
                                                        Repayment that is due and payable under the Loan Contract;
                                                        then to pay any arrears of principal and interest under the Loan
                                                        Contract;
                                                    </p>
                                                    <p>
                                                        then to pay any fees, charges, costs or expenses due to Zopa or any
                                                        third party under the Loan Contract.
                                                        All Repayments will be made without deduction of income tax.
                                                        You may wish to change the date upon which you make your Repayments, in
                                                        which case (unless condition 2.8 below applies).
                                                        You can change the Repayment Date by notifying Zopa that you wish to do
                                                        so and specifying the new date within the month upon which you wish your
                                                        Repayments to take place. Such changes may be made by logging-in to your
                                                        Zopa account and following the instructions there, or by email to
                                                        contactus@zopa.com or by calling us at the general contact number shown
                                                        on the Lending Platform (such calls may be recorded to confirm your
                                                        consent to the change).
                                                    </p>
                                                    <p>
                                                        Depending on whether the revised Repayment Date is before or after the
                                                        original Repayment Date in the month, the amount of your next Repayment
                                                        on the new Repayment Date will be adjusted to take account of the number
                                                        of days between the new Repayment Date and the previous one. The
                                                        remaining Repayments (assuming no further changes) will revert to the
                                                        usual Repayment amount.
                                                    </p>
                                                    <p>
                                                        Zopa will then acknowledge and confirm the new Repayment Date and any
                                                        change to the amount of your next Repayment as a result, before
                                                        effecting any change. Depending on how you request the change, this
                                                        acknowledgement and confirmation will take place online, during the
                                                        course of your telephone call or by an exchange of email with you.
                                                    </p>
                                                    <h6>
                                                        Please note that you will not be able to change your Repayment Date if
                                                        you have:
                                                    </h6>
                                                    <p>
                                                        missed one or more monthly Repayments;
                                                        made a request (i) less than three days before your next Repayment Date;
                                                        or (ii) more than 21 days ahead of your next Repayment Date;
                                                        a payment on your account which is pending or in progress; or
                                                        made a lump sum payment, and have not made a regular monthly Repayment
                                                        since.
                                                    </p>
                                                    <p>
                                                        If you miss a Repayment, or you find yourself in financial difficulties
                                                        and you believe you cannot afford to repay the amount due under any loan
                                                        agreement, you should contact us as soon as possible by email at
                                                        repayments@zopa.com or call us on 0203 770 5960.
                                                    </p>
                                                    <h6>
                                                        3. Early Repayment
                                                    </h6>
                                                    <p>
                                                        You can make payments at any time to repay some or all of the loan early
                                                        by logging into your account or by calling us 0203 770 5960. If you make
                                                        a partial Repayment the term of your loan will stay the same, but the
                                                        amount of your monthly Repayment will reduce. We’ll tell you the new
                                                        Repayment amount.
                                                    </p>
                                                    <h6>
                                                        4. When we can end the Agreement early
                                                    </h6>
                                                    <p>
                                                        We can demand repayment of the full amount outstanding on your loan if:
                                                        you fail to make the full amount of four Repayments;
                                                        we find that you have given us false information, or we cannot verify
                                                        information that we have relied on when deciding to make the loan;
                                                        we reasonably believe that the loan is being used in relation to fraud
                                                        or any other criminal activity;
                                                    </p>
                                                    <p>
                                                        you seriously and persistently breach these Loan Conditions and we have
                                                        reason to believe that you may not be able to continue making your loan
                                                        Repayments; or
                                                        you die, become insolvent, bankrupt or make a voluntary arrangement with
                                                        (or agree a trust deed for) people to whom you owe money.
                                                        Before making any demand, we will take all the steps we are required by
                                                        law to take for your protection.
                                                        5. Charges and missing payments
                                                        To borrow via the Lending Platform, you must pay the applicable
                                                        Borrowing Fee and the Interest Charges.
                                                    </p>
                                                    <h6>
                                                        Missing payments could have severe consequences for you, including the
                                                        following:
                                                    </h6>
                                                    <p>
                                                        we will report missed Repayments to credit reference agencies, which may
                                                        affect your credit rating and make it more difficult and expensive for
                                                        you to obtain credit from us and other lenders in the future;
                                                        you will have to repay the outstanding balance (including arrears)
                                                        payable under the agreement;
                                                        we may take legal proceedings against you and you may have to pay our
                                                        legal costs and other expenses; and
                                                        we may also obtain a charging order (or in Scotland an inhibition) on
                                                        your home to enforce any court judgment we obtain. This could result in
                                                        the outstanding debt being secured against your home.
                                                        You will be charged no interest or fees for missing payments.
                                                    </p>
                                                    <h6>
                                                        6. Statement of Account
                                                    </h6>
                                                    <p>
                                                        We will send you a statement at least annually showing the state of your
                                                        account. You can also ask us at any time and free of charge, for a
                                                        statement in the form of a table showing:
                                                    </p>
                                                    <p>
                                                        the details of each Repayment owing under the Loan Contract;
                                                        the date on which each Repayment is due, the amount and any conditions
                                                        relating to the payment of the Repayment;
                                                        a breakdown of each Repayment showing how much comprises:
                                                        capital Repayment,
                                                        interest payment at the Borrowing Rate, and,
                                                        if applicable, any other charges.
                                                    </p>
                                                    <p>
                                                        7. Other costs that are not paid via Zopa, the Lender or imposed by them
                                                        You are responsible for any telecommunications charges, digital
                                                        television subscription or other charges for the time you spend
                                                        accessing our website and online services via the internet or via any
                                                        wireless, mobile or television or other relevant network.
                                                    </p>
                                                    <h6>
                                                        8. Assignment of Loan Contracts
                                                    </h6>
                                                    <p>
                                                        Each Lender may freely assign or transfer or otherwise dispose of his or
                                                        her right, title and interest in the Loan Contract to any third party
                                                        via the Lending Platform (or any trading exchange or in any other manner
                                                        approved by Zopa for that purpose).
                                                        Your rights and obligations under a Loan Contract that has been assigned
                                                        or transferred shall not be adversely affected in any way whatsoever.
                                                        You shall not be entitled to assign or transfer any Loan Contract to
                                                        another person.
                                                    </p>
                                                    <p>
                                                        9. Law applicable to the conclusion of a distance contract
                                                        The laws of England and Wales are the basis for the establishment of
                                                        relations with you prior to the conclusion of the Loan Contract.
                                                    </p>
                                                    <h6>
                                                        10. Law applicable to the Loan Contract
                                                    </h6>
                                                    <p>
                                                        The Loan Contract and your dealings with us before signing the Loan
                                                        Contract are governed by and construed in accordance with the laws of
                                                        England and Wales.
                                                    </p>
                                                    <p>
                                                        The courts of England and Wales will deal with questions relating to the
                                                        Loan Contract unless you live in Scotland or Northern Ireland, in which
                                                        case you can choose the courts of those countries to deal with any
                                                        questions that arise.
                                                    </p>
                                                    <h6>
                                                        11. Language of this document: the Loan Contract and Contractual
                                                        Communications
                                                    </h6>
                                                    <p>
                                                        The Loan Contract and all related documentation are in the English
                                                        language; and the Lender undertakes to communicate with you in English
                                                        during the duration of the Loan Contract.
                                                    </p>
                                                    <h6>
                                                        12. Other legal terms
                                                    </h6>
                                                    <p>
                                                        Each of the clauses of the Loan Contract operates separately. If any
                                                        court or relevant authority decides that any of them are unlawful, the
                                                        remaining clauses will remain in full force and effect.
                                                    </p>
                                                    <p>
                                                        If either party does not strictly apply its rights under the Loan
                                                        Contract at any time, that will not prevent that party from doing so
                                                        later.
                                                    </p>
                                                    <p>
                                                        You agree that any notices, statements or documents given to you in
                                                        relation to any Loan Contract will be sent electronically to your Zopa
                                                        account, in which case you will also receive by email to your email
                                                        address a prompt to refer to your Zopa account, or may be sent by post
                                                        to your last known postal address. The notice, statements or documents
                                                        will be sent to you in a form that can be stored and reproduced (without
                                                        any change to the contents) for your future reference.
                                                    </p>
                                                    <p>
                                                        You should contact Zopa by emailing contactus@zopa.com or by calling
                                                        0207 580 6060 if you think there is a mistake with any records relating
                                                        to your Loan Contract.
                                                    </p>
                                                    <p>
                                                        You confirm that you have a regular source of income, do not expect this
                                                        to change over the lifetime of the Loan Contract and have no reason to
                                                        think that you will be unable to make the Repayments required.
                                                    </p>
                                                    <h6>
                                                        13. Cancellation or the Right to Withdraw
                                                    </h6>
                                                    <p>
                                                        You will have a right to withdraw in accordance with the provisions on
                                                        page 2 of the Loan Contract (Right to Withdraw).
                                                    </p>
                                                    <p>
                                                        Once you have signed the Loan Contract, you will have FOURTEEN calendar
                                                        days starting from (a) the day the Agreement is made (i.e. the day you
                                                        sign it), or (b) the day you receive a copy of the signed Agreement
                                                        (whichever is the latest) to withdraw from the Loan Contract without
                                                        having to give a reason.
                                                    </p>
                                                    <p>
                                                    </p><h6>
                                                        If you wish to cancel the Loan Contract:
                                                    </h6>
                                                    <p>
                                                        you can send a WRITTEN notice of cancellation to contactus@zopa.com or
                                                        cancel ORALLY by calling 0207 580 6060 (please be aware conversations
                                                        may be recorded for evidentiary purposes);
                                                        you must repay the whole loan amount; and
                                                        you must make such a repayment without undue delay and no later than the
                                                        end of the period of 30 days beginning with the day after which the
                                                        notice of withdrawal is given.
                                                        The credit due and payable in the event of your withdrawal must be paid
                                                        to Zopa Bank Ltd, Royal Bank of Scotland, sort code 16-00-30, account
                                                        number 11314480.
                                                    </p>
                                                    <h6>
                                                        14. Complaints and complaints handling
                                                    </h6>
                                                    <p>
                                                        If you want to make a complaint you can email complaints@zopa.com with
                                                        brief details of your complaint and your account reference.
                                                        Alternatively, you can write to us at Zopa, Complaints Team, 1st Floor,
                                                        Cottons Centre, Tooley Street, London, SE1 2QG or call our Customer
                                                        Services Team on 020 7580 6060 between Monday to Thursday (8am to 8pm),
                                                        and Friday (8am to 5pm). Zopa will acknowledge your complaint within one
                                                        business day. Zopa will then investigate and send you an initial
                                                        response. This should take no longer than three business days.
                                                        If we’re unable to resolve your complaint within 3 business days we will
                                                        keep you informed of our investigations until we are able to provide you
                                                        with an initial response.
                                                    </p>
                                                    <p>
                                                        If within eight weeks after receiving a complaint we are still not able
                                                        to resolve the matter, we will send you a final response. If you don’t
                                                        agree with our final response you may refer your complaint to the
                                                        Financial Ombudsman Service, who can be contacted by telephone on 0800
                                                        023 4567 or at www.financial-ombudsman.org.uk. You also have the right
                                                        to make a complaint directly to the Financial Ombudsman Service.
                                                        15. Credit Intermediary details
                                                        Not applicable.
                                                    </p>
                                                    <h6>
                                                        16. Your Personal Data
                                                    </h6>
                                                    <p>
                                                        We will process your personal data in connection with the performance of
                                                        our rights and obligations under this Agreement and our regulatory
                                                        obligations, in accordance with our Privacy Notice
                                                        (www.zopa.com/privacy-notice).
                                                    </p>
                                                    <h6>
                                                        17. Defined Terms
                                                    </h6>
                                                    <p>
                                                        In these Loan Conditions the following words have the following
                                                        meanings:
                                                    </p>
                                                    <h6>
                                                        "Borrowing Fee"
                                                    </h6>
                                                    <p>
                                                        means the fee charged by Zopa for setting up your loan, as specified
                                                        in
                                                        your Loan Contract;
                                                    </p>
                                                    <h6>
                                                        "Borrower", "you", "your"
                                                    </h6>
                                                    <p>
                                                        means the Zopa Customer identified as the Borrower in the Loan
                                                        Contract;
                                                    </p>
                                                    <h6>
                                                        "Borrowing Rate"
                                                    </h6>
                                                    <p>
                                                        means the total rate of interest payable by the Borrower under the Loan
                                                        Contract;
                                                    </p>
                                                    <h6>
                                                        "Credit Rating"
                                                    </h6>
                                                    <p>
                                                        means a credit rating supplied by Equifax plc or such other credit
                                                        reference agency that Zopa may use from time to time in relation to the
                                                        Borrower for use in connection with the Lending Platform;
                                                    </p>
                                                    <h6>
                                                        "Default"
                                                    </h6>
                                                    <p>
                                                        means the failure of the Borrower to pay the full amount of four
                                                        Repayments then due and payable in relation to the Loan Contract;
                                                    </p>
                                                    <h6>
                                                        "Interest Charges"
                                                    </h6>
                                                    <p>
                                                        means interest charges outlined in the Key Financial Information section
                                                        of your Loan Contract;
                                                    </p>
                                                    <h6>
                                                        "Lender"
                                                    </h6>
                                                    <p>
                                                        means the Lender in the Loan Contract and any assignee, transferee or
                                                        successor in title following any assignment, transfer or disposal under
                                                        Clause 7;
                                                    </p>
                                                    <h6>
                                                        "Lender Rate"
                                                    </h6>
                                                    <p>
                                                        means the rate of interest payable to a Lender under a Loan Contract;
                                                    </p>
                                                    <h6>
                                                        "Lending Platform"
                                                    </h6>
                                                    <p>
                                                        means the internet marketplace which Zopa Limited operates at
                                                        www.zopa.com for the purpose of matching lenders and borrowers;
                                                    </p>
                                                    <h6>
                                                        "Loan Conditions"
                                                    </h6>
                                                    <p>
                                                        means these terms and
                                                        conditions;
                                                    </p>
                                                    <h6>
                                                        "Loan Contract"
                                                    </h6>
                                                    <p>
                                                        means the agreement, incorporating the Loan Conditions, under which the
                                                        Lender agrees to make a loan to the Borrower;
                                                    </p>
                                                    <h6>
                                                        "Loan Contract Summary"
                                                    </h6>
                                                    <p>
                                                        means the summary of all the Loan Contracts entered into by the Borrower
                                                        at or about the same time (where more than one Loan Contract is entered
                                                        into);
                                                    </p>
                                                    <h6>
                                                        "Nominated Account"
                                                    </h6>
                                                    <p>
                                                        means the current account you have with a UK bank from which you
                                                        authorise Zopa to collect Repayments under the direct debiting scheme
                                                        (or other payment method approved by us), and/or to which Zopa will make
                                                        any payments due to you, as the case may be;
                                                    </p>
                                                    <h6>
                                                        "Repayment"
                                                    </h6>
                                                    <p>
                                                        means each instalment due and payable by the Borrower under each Loan
                                                        Contract, which shall comprise principal and interest, as well as any
                                                        amount otherwise due and payable by the Borrower under the Loan
                                                        Contract;
                                                    </p>
                                                    <h6>
                                                        "Zopa"
                                                    </h6>
                                                    <p>
                                                        means Zopa Bank Limited, whose registered office is 1st Floor, Cottons
                                                        Centre, 47-49 Tooley Street, London. SE1 2QG. Company Registration
                                                        Number 10627575. Zopa Bank Limited is also:
                                                        the holder of Consumer Credit Licence Number 800542; authorised and
                                                        registered by the Financial Conduct Authority, and entered on the
                                                        Financial Services Register under firm registration number 800542;
                                                        registered with the Office of the Information Commissioner (registration
                                                        number ZA275984); and a member of CIFAS; "Zopa Customer" means an
                                                        individual who has completed the registration process to use the Lending
                                                        Platform and has entered in to one or more Loan Contracts as a borrower
                                                        or lender;
                                                    </p>
                                                    <h6> "Zopa
                                                        Customers'
                                                        Account"
                                                    </h6>
                                                    <p>
                                                        means any segregated bank account that Zopa maintains with a UK bank for
                                                        the sole purpose of holding funds to which Zopa Customers are
                                                        beneficially entitled in accordance with any Loan Contract.
                                                    </p>
                                                    <p>
                                                        Zopa loan conditions How we use your p
                                                    </p>
                                                </div>
                                            </div>
                                            {/* start */}
                                            <div className="chk-main-term">
                                                <div className="checkbox-box term-chk mb0">
                                                    <input
                                                        type="checkbox"
                                                        id="agreementConsent"
                                                        name="agreementConsent"
                                                        {...register("agreementConsent", {
                                                            required: "Agreement consent is required"
                                                        })}
                                                    />
                                                    <label className="chk-label" htmlFor="agreementConsent">
                                                        I have read and agree to the Key Facts, which explain the details of the
                                                        loan contract.
                                                    </label>
                                                </div>
                                            </div>
                                            {/* end */}
                                        </div>
                                        {errors.agreementConsent &&
                                            <div className="form-input-error">
                                                <i className="icon-input-error"></i>
                                                <p>{errors.agreementConsent.message}</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="comm-disclaim">
                                        <p>
                                            We use your personal information to set up and administer your loan. For detailed
                                            information about how we process your personal data and including why we share your
                                            information with credit reference agencies (CRAs) and fraud prevention services, please
                                            refer to our Privacy Notice.
                                        </p>
                                    </div>
                                    {/* [disabled] */}
                                    <button className="button button--block">Finish</button>
                                </form>
                            </div>
                            {/* end */}
                        </div>

                    </div>
                    {/* end */}
                </div>
            </div>
            {/* Main Container Ends */}
        </div>
    )
}

export default FinalizeLoanDetail