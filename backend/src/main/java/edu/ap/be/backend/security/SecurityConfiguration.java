package edu.ap.be.backend.security;

import edu.ap.be.backend.security.jwt.AuthEntryPointJwt;
import edu.ap.be.backend.security.jwt.AuthTokenFilter;
import edu.ap.be.backend.security.service.UserDetailsServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.DigestAuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.DigestAuthenticationFilter;
import io.jsonwebtoken.*;
import static org.springframework.security.config.Customizer.withDefaults;
import javax.servlet.Filter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    UserDetailsServiceImp userDetailsService;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter() {
        return new AuthTokenFilter();
    }

    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // DigestAuthenticationEntryPoint entryPoint() {
    // DigestAuthenticationEntryPoint result = new DigestAuthenticationEntryPoint();
    // result.setRealmName("My App Realm");
    // result.setKey("3028472b-da34-4501-bfd8-a355c42bdf92");
    // return result;
    // }

    // DigestAuthenticationFilter digestAuthenticationFilter() {
    // DigestAuthenticationFilter result = new DigestAuthenticationFilter();
    // result.setUserDetailsService(userDetailsService);
    // result.setAuthenticationEntryPoint(entryPoint());
    // return result;
    // }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.formLogin(form -> form
                .loginPage("/login")
                .permitAll());

        http.cors().and().csrf().disable()
                // .anonymous().disable()
                .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeRequests().antMatchers("/auth/**").permitAll()
                .antMatchers("/test/**").permitAll()
                .antMatchers("/users**").permitAll()
                .antMatchers("/users/**").permitAll()
                .antMatchers("/auth/**").permitAll()
                .antMatchers("/auth**").permitAll()
                .antMatchers("/kredietaanvragen*").permitAll()
                .antMatchers("/kredietaanvragen/*").permitAll()
                .anyRequest().authenticated();
        // .and().csrf().disable().formLogin().loginPage("/login").permitAll()
        // .usernameParameter("email").passwordParameter("password");
        // http.addFilterBefore(authenticationJwtTokenFilter(),
        // UsernamePasswordAuthenticationFilter.class);
        // http.sessionManagement(session ->
        // session.maximumSessions(1).maxSessionsPreventsLogin(true));
        // http.logout(logout -> logout
        // .logoutUrl("/logout")
        // .logoutSuccessUrl("/login")
        // .invalidateHttpSession(true)
        // .deleteCookies("JSESSIONID"));

        // http.cors().and()
        // .csrf().disable()
        // .authorizeRequests()
        // .antMatchers("/admin/**").hasRole("ADMIN")
        // .antMatchers("/anonymous*").anonymous()
        // .antMatchers("/login*").permitAll()
        // // .antMatchers("/auth/*").permitAll()
        // .anyRequest().authenticated()
        // .and()
        // .formLogin()
        // .loginPage("/login")
        // .loginProcessingUrl("/login")
        // .defaultSuccessUrl("/", true)
        // .failureUrl("/login")
        // .and()
        // .logout()
        // .logoutUrl("/perform_logout")
        // .deleteCookies("JSESSIONID");
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {

        auth.inMemoryAuthentication()
                .withUser("klant")
                .password("password")
                .roles("KLANT").and()
                .withUser("admin")
                .password("password")
                .roles("ADMINISTRATOR");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/patat**");// #3
    }

    // @Override
    // protected void configure(HttpSecurity http) throws Exception {
    // http
    // .authorizeRequests()
    // .antMatchers("/signup",
    // "/about",
    // "/kredietaanvragen**",
    // "/users**",
    // "/kredietaanvragen/**",
    // "/users/**").permitAll() // #4
    // .antMatchers("/admin/**").hasRole("ADMIN") // #6
    // .anyRequest().authenticated() // 7
    // .and()
    // .formLogin() // #8
    // .loginPage("/login") // #9
    // .permitAll(); // #5
    // }
}
